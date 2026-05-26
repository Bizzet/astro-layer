#!/usr/bin/env node
// Runs at session start. Outputs orientation context to stdout.
// Claude reads this as injected context for the session.
import { execSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { readBuildState } from './build-state.js';

const cwd = process.cwd();

function safeRead(filePath) {
  try {
    return existsSync(filePath) ? readFileSync(filePath, 'utf-8') : null;
  } catch {
    return null;
  }
}

function getAstroVersion() {
  try {
    const pkg = safeRead(join(cwd, 'node_modules/astro/package.json'));
    if (pkg) return JSON.parse(pkg).version;
  } catch {}
  return null;
}

function getProjectName() {
  const claudeMd = safeRead(join(cwd, 'CLAUDE.md'));
  if (claudeMd) {
    const match = claudeMd.match(/^#\s+(.+)$/m);
    if (match) return match[1].trim();
  }
  const siteMap = safeRead(join(cwd, 'SITE_MAP.md'));
  if (siteMap) {
    const match = siteMap.match(/^#\s+(.+)$/m);
    if (match) return match[1].trim();
  }
  return null;
}

function getGitActivity() {
  try {
    const log = execSync('git log --oneline -10 --name-only', {
      cwd,
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 5000,
    }).toString();

    const files = new Set();
    for (const line of log.split('\n')) {
      if (line.startsWith('src/') || line.startsWith('public/')) {
        files.add(line.trim());
      }
    }

    const hotAreas = new Set();
    for (const f of files) {
      const parts = f.split('/');
      if (parts.length >= 2) hotAreas.add(`${parts[0]}/${parts[1]}/`);
    }

    return {
      files: [...files].slice(0, 10),
      hotAreas: [...hotAreas],
    };
  } catch {
    return null;
  }
}

function getPlanTasks() {
  const planMd = safeRead(join(cwd, 'PLAN.md'));
  if (!planMd) return null;
  const incomplete = planMd
    .split('\n')
    .filter((line) => line.includes('- [ ]'))
    .map((line) => line.trim().replace(/^-\s*\[\s*\]\s*/, '').trim());
  return incomplete.length > 0 ? incomplete : null;
}

function formatBuildState(state) {
  if (!state || state.status === 'complete') return null;

  const pages = state.pages || [];
  const done = pages.filter((p) => p.status === 'complete');
  const pending = pages.filter((p) => p.status !== 'complete');
  const resumeAt = pending[0];

  const lines = [
    `Build status: IN PROGRESS (${done.length}/${pages.length} pages complete)`,
  ];
  for (const page of pages) {
    const icon = page.status === 'complete' ? '✓' : '✗';
    const note = page === resumeAt ? '  ← resume here' : '';
    lines.push(`  ${icon} ${page.id}${note}`);
  }
  lines.push('Run /astro-layer:new-site to resume.');
  return lines.join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────────

const projectName = getProjectName();
const astroVersion = getAstroVersion();
const buildState = readBuildState(cwd);
const buildBlock = formatBuildState(buildState);
const planTasks = getPlanTasks();
const git = getGitActivity();

const lines = ['=== Astro Layer: Session Start ==='];

if (projectName) lines.push(`Project: ${projectName}`);
if (astroVersion) lines.push(`Astro version: ${astroVersion}`);
else lines.push('Astro version: 6.3 (target)');

if (buildBlock) {
  lines.push('');
  lines.push(buildBlock);
}

if (planTasks) {
  lines.push('');
  lines.push(`Open tasks (PLAN.md — ${planTasks.length} remaining):`);
  for (const task of planTasks) lines.push(`  • ${task}`);
}

if (git) {
  lines.push('');
  lines.push('Recent activity (git log):');
  for (const f of git.files) lines.push(`  - ${f}`);
  if (git.hotAreas.length > 0) {
    lines.push(`Hot areas: ${git.hotAreas.join(', ')}`);
  }
  lines.push('Tip: To scope Claude to one area, start it from that subdirectory.');
}

lines.push('===');

process.stdout.write(lines.join('\n') + '\n');
