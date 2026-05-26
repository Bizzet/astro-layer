#!/usr/bin/env node
// Runs after every Write or Edit tool call.
// Runs `npx astro check` if the modified file is an Astro/TS source file.
// On failure: exits non-zero so Claude sees TypeScript errors immediately.
import { execSync } from 'node:child_process';

const SKIP_DIRS = ['dist/', '.astro/', 'node_modules/'];
const CHECK_EXTS = ['.astro', '.ts', '.tsx'];

let input = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  let filePath = '';
  try {
    const data = JSON.parse(input);
    filePath = data?.tool_input?.file_path ?? '';
  } catch {
    process.exit(0);
  }

  // No-op conditions
  if (!filePath) process.exit(0);
  if (SKIP_DIRS.some((d) => filePath.includes(d))) process.exit(0);
  if (!CHECK_EXTS.some((ext) => filePath.endsWith(ext))) process.exit(0);

  try {
    execSync('npx astro check --minimumFailingSeverity error', {
      stdio: 'inherit',
      timeout: 60_000,
    });
    process.exit(0);
  } catch (err) {
    // astro check exits non-zero on errors — propagate so Claude sees output
    process.exit(err.status ?? 1);
  }
});
