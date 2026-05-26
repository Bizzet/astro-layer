#!/usr/bin/env node
// MCP server — provides 4 tools for searching an Astro 6.3 project.
// Registered in plugin.json and run via: node mcp/astro-search.js
import { readFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { glob } from 'node:fs/promises';

const cwd = process.cwd();

// ── MCP protocol helpers ──────────────────────────────────────────────────────

function send(obj) {
  process.stdout.write(JSON.stringify(obj) + '\n');
}

function error(id, code, message) {
  send({ jsonrpc: '2.0', id, error: { code, message } });
}

function result(id, data) {
  send({ jsonrpc: '2.0', id, result: data });
}

// ── Tool implementations ───────────────────────────────────────────────────────

async function findComponent(name) {
  const matches = [];
  try {
    for await (const file of glob('src/components/**/*.astro', { cwd })) {
      if (!file.toLowerCase().includes(name.toLowerCase())) continue;
      const content = readFileSync(join(cwd, file), 'utf-8');
      const propsMatch = content.match(/interface\s+Props\s*\{[^}]*\}/s);
      const slots = [...content.matchAll(/<slot\s+name="([^"]+)"/g)].map((m) => m[1]);
      const imports = [...content.matchAll(/^import\s+.+$/gm)].map((m) => m[0].trim());
      matches.push({ file, props: propsMatch?.[0] ?? null, slots, imports });
    }
  } catch {}
  return matches;
}

async function listRoutes() {
  const routes = [];
  try {
    for await (const file of glob('src/pages/**/*.astro', { cwd })) {
      let route = '/' + file
        .replace(/^src\/pages\//, '')
        .replace(/index\.astro$/, '')
        .replace(/\.astro$/, '')
        .replace(/\[\.\.\.([^\]]+)\]/, ':$1*')
        .replace(/\[([^\]]+)\]/, ':$1');
      if (route.endsWith('/') && route !== '/') route = route.slice(0, -1);

      const content = readFileSync(join(cwd, file), 'utf-8');
      const layoutMatch = content.match(/import\s+\w+\s+from\s+['"][^'"]*layouts[^'"]*['"]/);
      const titleMatch = content.match(/title[=:]\s*['"`]([^'"`]+)['"`]/);
      routes.push({
        file,
        route,
        layout: layoutMatch ? layoutMatch[0] : null,
        title: titleMatch ? titleMatch[1] : null,
      });
    }
  } catch {}
  return routes;
}

function findToken(name) {
  const tokensPath = join(cwd, 'src/styles/tokens.css');
  if (!existsSync(tokensPath)) return null;

  const content = readFileSync(tokensPath, 'utf-8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(new RegExp(`--${name}\\s*:\\s*(.+);`));
    if (match) {
      const category = lines.slice(0, i).reverse().find((l) => l.includes('/* ──'))
        ?.match(/\/\*\s*──\s*(.+?)\s*──/)?.[1] ?? 'unknown';
      return { value: match[1].trim(), category, line: i + 1 };
    }
  }
  return null;
}

function componentOutline(filePath) {
  const absPath = join(cwd, filePath);
  if (!existsSync(absPath)) return null;

  const content = readFileSync(absPath, 'utf-8');
  const propsMatch = content.match(/interface\s+Props\s*\{[^}]*\}/s);
  const slots = [...content.matchAll(/<slot\s+(?:name="([^"]*)")?/g)].map((m) => m[1] ?? 'default');
  const imports = [...content.matchAll(/^import\s+.+$/gm)].map((m) => m[0].trim());
  const tokens = [...new Set([...content.matchAll(/var\(--([^)]+)\)/g)].map((m) => `--${m[1]}`))];
  const transitions = [...content.matchAll(/transition:name="([^"]+)"/g)].map((m) => m[1]);

  return { file: filePath, props: propsMatch?.[0] ?? null, slots, imports, tokens, transitions };
}

// ── MCP message handler ───────────────────────────────────────────────────────

const TOOLS = [
  {
    name: 'find_component',
    description: 'Search src/components/**/*.astro by name. Returns Props interface, slots, and imports.',
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string', description: 'Component name to search for' } },
      required: ['name'],
    },
  },
  {
    name: 'list_routes',
    description: 'Walk src/pages/ and return all routes with file path, URL route, layout, and title.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'find_token',
    description: 'Find a CSS custom property in src/styles/tokens.css by name (without --). Returns value, category, and line number.',
    inputSchema: {
      type: 'object',
      properties: { name: { type: 'string', description: 'Token name without -- prefix (e.g. "color-brand")' } },
      required: ['name'],
    },
  },
  {
    name: 'component_outline',
    description: 'Read one .astro file and return Props interface, named slots, imports, CSS tokens used, and transition:name directives.',
    inputSchema: {
      type: 'object',
      properties: { file_path: { type: 'string', description: 'Relative path to the .astro file' } },
      required: ['file_path'],
    },
  },
];

let buffer = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => {
  buffer += chunk;
  const lines = buffer.split('\n');
  buffer = lines.pop() ?? '';
  for (const line of lines) {
    if (!line.trim()) continue;
    handleMessage(line.trim());
  }
});

async function handleMessage(raw) {
  let msg;
  try { msg = JSON.parse(raw); } catch { return; }

  const { id, method, params } = msg;

  if (method === 'initialize') {
    result(id, {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: { name: 'astro-search', version: '2.0.0' },
    });
    return;
  }

  if (method === 'tools/list') {
    result(id, { tools: TOOLS });
    return;
  }

  if (method === 'tools/call') {
    const { name, arguments: args } = params;
    try {
      let data;
      if (name === 'find_component') data = await findComponent(args.name);
      else if (name === 'list_routes') data = await listRoutes();
      else if (name === 'find_token') data = findToken(args.name);
      else if (name === 'component_outline') data = componentOutline(args.file_path);
      else { error(id, -32601, `Unknown tool: ${name}`); return; }

      result(id, {
        content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
      });
    } catch (err) {
      error(id, -32603, err.message);
    }
    return;
  }

  error(id, -32601, `Method not found: ${method}`);
}

process.stdin.on('end', () => process.exit(0));
