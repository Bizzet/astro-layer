#!/usr/bin/env node
// Validates the astro-layer plugin installation. Target: 15/15.
// Run: node tooling/validate-all.js
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

let passed = 0;
let failed = 0;

function check(num, desc, fn) {
  try {
    const ok = fn();
    if (ok) {
      console.log(`  ✓ [${num}] ${desc}`);
      passed++;
    } else {
      console.log(`  ✗ [${num}] ${desc}`);
      failed++;
    }
  } catch (err) {
    console.log(`  ✗ [${num}] ${desc}`);
    console.log(`       Error: ${err.message}`);
    failed++;
  }
}

function readJson(relPath) {
  const content = readFileSync(join(root, relPath), 'utf-8');
  return JSON.parse(content);
}

function fileExists(relPath) {
  return existsSync(join(root, relPath));
}

function fileContains(relPath, str) {
  const content = readFileSync(join(root, relPath), 'utf-8');
  return content.includes(str);
}

function parseFrontmatter(relPath) {
  const content = readFileSync(join(root, relPath), 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^(\w[\w-]*):\s*(.+)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return fm;
}

console.log('\nastro-layer validation\n');

// ── Check 1: plugin.json valid JSON with required fields ─────────────────────
check(1, 'plugin.json valid JSON with name, version, mcpServers', () => {
  const p = readJson('.claude-plugin/plugin.json');
  return typeof p.name === 'string' && typeof p.version === 'string' && typeof p.mcpServers === 'object';
});

// ── Check 2: All 16 SKILL.md files have name + description frontmatter ───────
check(2, 'All 16 SKILL.md files have name + description frontmatter', () => {
  const skills = [
    'new-site', 'init', 'new-component', 'new-page', 'new-section',
    'design-tokens', 'seo-optimize', 'content-collection', 'add-blog',
    'animate', 'dark-mode', 'add-font', 'deploy-vercel',
    'performance-check', 'quality-check', 'client-handoff',
  ];
  for (const skill of skills) {
    const path = `skills/${skill}/SKILL.md`;
    if (!fileExists(path)) throw new Error(`Missing: ${path}`);
    const fm = parseFrontmatter(path);
    if (!fm.name) throw new Error(`Missing name in ${path}`);
    if (!fm.description) throw new Error(`Missing description in ${path}`);
  }
  return true;
});

// ── Check 3: All references/ files exist ────────────────────────────────────
check(3, 'All references/ files exist (no broken links from skills)', () => {
  const refs = [
    'skills/new-site/references/site-brief.md',
    'skills/init/references/CLAUDE.root.md',
    'skills/init/references/CLAUDE.components.md',
    'skills/init/references/CLAUDE.pages.md',
    'skills/init/references/CLAUDE.styles.md',
    'skills/init/references/settings.json.template',
    'skills/init/references/claudeignore.template',
    'skills/new-component/references/component-patterns.md',
    'skills/new-page/references/page-patterns.md',
    'skills/new-section/references/sections.md',
    'skills/design-tokens/references/token-system.md',
    'skills/seo-optimize/references/seo-patterns.md',
    'skills/content-collection/references/collection-schemas.md',
    'skills/add-blog/references/blog-patterns.md',
    'skills/animate/references/animation-patterns.md',
    'skills/dark-mode/references/dark-mode-patterns.md',
    'skills/add-font/references/font-patterns.md',
    'skills/performance-check/references/perf-checklist.md',
    'skills/quality-check/references/quality-checklist.md',
  ];
  for (const ref of refs) {
    if (!fileExists(ref)) throw new Error(`Missing: ${ref}`);
  }
  return true;
});

// ── Check 4: hooks/hooks.json valid JSON with required hook types ─────────────
check(4, 'hooks/hooks.json valid JSON with SessionStart + PostToolUse + Stop', () => {
  const h = readJson('hooks/hooks.json');
  return (
    typeof h.hooks?.SessionStart === 'object' &&
    typeof h.hooks?.PostToolUse === 'object' &&
    typeof h.hooks?.Stop === 'object'
  );
});

// ── Check 5: All 5 hook scripts are valid JavaScript ─────────────────────────
check(5, 'All 5 hook scripts are valid JavaScript', () => {
  const scripts = [
    'hooks/session-start.js',
    'hooks/check-astro.js',
    'hooks/propose-claude-md.js',
    'hooks/reflect-claude-md.js',
    'hooks/build-state.js',
  ];
  for (const script of scripts) {
    if (!fileExists(script)) throw new Error(`Missing: ${script}`);
    execSync(`node --check "${join(root, script)}"`, { stdio: 'pipe' });
  }
  return true;
});

// ── Check 6: .lsp.json valid JSON with astro entry ───────────────────────────
check(6, '.lsp.json valid JSON with astro entry + extensionToLanguage', () => {
  const lsp = readJson('.lsp.json');
  return (
    typeof lsp.astro?.command === 'string' &&
    typeof lsp.astro?.extensionToLanguage?.['.astro'] === 'string'
  );
});

// ── Check 7: agents/explorer.md read-only tools only ─────────────────────────
check(7, 'agents/explorer.md has tools: Read, Grep, Glob — no Write/Edit', () => {
  const content = readFileSync(join(root, 'agents/explorer.md'), 'utf-8');
  if (!content.includes('tools: Read, Grep, Glob')) throw new Error('Missing tools: Read, Grep, Glob');
  if (content.includes('Write') && content.match(/tools:.*Write/)) throw new Error('Write in tools list');
  if (content.includes('Edit') && content.match(/tools:.*Edit/)) throw new Error('Edit in tools list');
  return true;
});

// ── Check 8: mcp/astro-search.js starts and responds to initialize ───────────
check(8, 'mcp/astro-search.js responds to MCP initialize handshake', () => {
  const msg = JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2024-11-05' } });
  // Pass via stdin using the input option — avoids shell echo quoting issues on Windows
  const out = execSync(
    `node "${join(root, 'mcp/astro-search.js')}"`,
    { input: msg + '\n', stdio: ['pipe', 'pipe', 'pipe'], timeout: 10_000 }
  ).toString();
  const response = JSON.parse(out.trim().split('\n')[0]);
  return response?.result?.serverInfo?.name === 'astro-search';
});

// ── Check 9: All 4 CLAUDE.md templates have required sections ────────────────
check(9, 'All 4 CLAUDE.md templates in init/references/ have required sections', () => {
  const checks = [
    { file: 'skills/init/references/CLAUDE.root.md', required: ['## Where things live', '## Commands'] },
    { file: 'skills/init/references/CLAUDE.components.md', required: ['## Conventions'] },
    { file: 'skills/init/references/CLAUDE.pages.md', required: ['## Conventions'] },
    { file: 'skills/init/references/CLAUDE.styles.md', required: ['## Token categories', '## Layer order'] },
  ];
  for (const { file, required } of checks) {
    const content = readFileSync(join(root, file), 'utf-8');
    for (const heading of required) {
      if (!content.includes(heading)) throw new Error(`Missing "${heading}" in ${file}`);
    }
  }
  return true;
});

// ── Check 10: .claudeignore template has required entries ────────────────────
check(10, '.claudeignore template has required entries', () => {
  const content = readFileSync(join(root, 'skills/init/references/claudeignore.template'), 'utf-8');
  for (const entry of ['dist/', '.astro/', 'node_modules/']) {
    if (!content.includes(entry)) throw new Error(`Missing "${entry}" in claudeignore.template`);
  }
  return true;
});

// ── Check 11: settings.json.template valid JSON with allow + deny ────────────
check(11, 'settings.json.template valid JSON with allow + deny arrays', () => {
  const s = readJson('skills/init/references/settings.json.template');
  return Array.isArray(s.permissions?.allow) && Array.isArray(s.permissions?.deny);
});

// ── Check 12: starter/ has no <ViewTransitions /> — only <ClientRouter /> ────
check(12, 'starter/ has no <ViewTransitions /> — only <ClientRouter />', () => {
  const result = execSync(
    `node -e "const {readFileSync,readdirSync,statSync}=require('fs');const{join}=require('path');function walk(d){let out=[];for(const f of readdirSync(d)){const p=join(d,f);if(statSync(p).isDirectory())out.push(...walk(p));else if(p.endsWith('.astro'))out.push(p);}return out;}const files=walk('${join(root, 'starter').replace(/\\/g, '/')}');for(const f of files){const c=readFileSync(f,'utf-8');if(c.includes('<ViewTransitions')){console.log('FOUND:'+f);process.exit(1);}}console.log('OK');"`,
    { stdio: 'pipe' }
  ).toString().trim();
  return result === 'OK';
});

// ── Check 13: hooks/build-state.js exports readBuildState + writeBuildState ───
check(13, 'hooks/build-state.js exports readBuildState and writeBuildState', () => {
  const content = readFileSync(join(root, 'hooks/build-state.js'), 'utf-8');
  return content.includes('export function readBuildState') && content.includes('export function writeBuildState');
});

// ── Check 14: starter/ passes npx astro check ────────────────────────────────
check(14, 'starter/ passes npx astro check with zero errors', () => {
  const starterDir = join(root, 'starter');
  if (!existsSync(join(starterDir, 'node_modules'))) {
    // Install deps first
    execSync('npm install --silent', { cwd: starterDir, stdio: 'pipe', timeout: 120_000 });
  }
  execSync('npx astro check --minimumFailingSeverity error', {
    cwd: starterDir,
    stdio: 'pipe',
    timeout: 60_000,
  });
  return true;
});

// ── Check 15: starter/ builds successfully ───────────────────────────────────
check(15, 'starter/ builds successfully with npm run build', () => {
  const starterDir = join(root, 'starter');
  if (!existsSync(join(starterDir, 'node_modules'))) {
    execSync('npm install --silent', { cwd: starterDir, stdio: 'pipe', timeout: 120_000 });
  }
  execSync('npm run build', {
    cwd: starterDir,
    stdio: 'pipe',
    timeout: 120_000,
  });
  return true;
});

// ── Summary ───────────────────────────────────────────────────────────────────

console.log(`\n${passed}/${passed + failed} checks passed\n`);
if (failed > 0) process.exit(1);
