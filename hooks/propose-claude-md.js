#!/usr/bin/env node
// Runs at session end. Spawns reflect-claude-md.js as a detached background
// process. Exits immediately — does NOT block the main turn.
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Recursion guard — exit if we're already reflecting
if (process.env.ASTRO_LAYER_REFLECTING === '1') {
  process.exit(0);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const reflectScript = join(__dirname, 'reflect-claude-md.js');

function getChangedFiles() {
  try {
    const output = execSync('git diff HEAD --name-only', {
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 5000,
    }).toString();
    return output.split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

const changedFiles = getChangedFiles();
if (changedFiles.length === 0) {
  process.exit(0);
}

if (!existsSync(reflectScript)) {
  process.exit(0);
}

// Spawn detached — exits immediately so main turn is unblocked
const child = spawn(process.execPath, [reflectScript], {
  detached: true,
  stdio: ['pipe', 'pipe', 'ignore'],
  env: { ...process.env, ASTRO_LAYER_REFLECTING: '1' },
});

child.stdin.write(JSON.stringify(changedFiles));
child.stdin.end();
child.unref();

process.exit(0);
