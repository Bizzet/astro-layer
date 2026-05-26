#!/usr/bin/env node
// Background process: reads changed files, calls claude headless, writes review.
// Spawned by propose-claude-md.js — never called directly.
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const cwd = process.cwd();
const reviewPath = join(cwd, '.claude/claude-md-review.md');

let input = '';
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (chunk) => { input += chunk; });
process.stdin.on('end', () => {
  let changedFiles = [];
  try {
    changedFiles = JSON.parse(input);
  } catch {
    writeFile(deterministicFallback([]));
    process.exit(0);
  }

  const fileList = changedFiles.join('\n  - ');

  // Read file contents for context
  const fileContents = changedFiles
    .filter((f) => existsSync(join(cwd, f)))
    .map((f) => {
      try {
        const content = readFileSync(join(cwd, f), 'utf-8');
        return `### ${f}\n\`\`\`\n${content.slice(0, 2000)}\n\`\`\``;
      } catch {
        return `### ${f}\n(unreadable)`;
      }
    })
    .join('\n\n');

  const prompt = `You are reviewing an Astro 6.3 project session. These files changed:\n  - ${fileList}\n\nFile contents:\n${fileContents}\n\nPropose specific CLAUDE.md updates — new conventions established, new tokens added, patterns to document. Write concrete additions, not vague suggestions. Format as Markdown additions ready to copy-paste.`;

  try {
    // Check if claude binary is available
    execSync('claude --version', { stdio: 'pipe', timeout: 5000 });

    const result = execSync(
      `claude -p "${prompt.replace(/"/g, '\\"')}"`,
      { stdio: ['pipe', 'pipe', 'pipe'], timeout: 60_000, cwd }
    ).toString();

    writeFile(result);
  } catch {
    writeFile(deterministicFallback(changedFiles));
  }

  process.exit(0);
});

function writeFile(content) {
  try {
    mkdirSync(join(cwd, '.claude'), { recursive: true });
    writeFileSync(reviewPath, content, 'utf-8');
  } catch {}
}

function deterministicFallback(files) {
  const list = files.length > 0 ? `\n- ${files.join('\n- ')}` : '(none)';
  return `# CLAUDE.md Review\n\nSession touched:${list}\n\nReview these files and update CLAUDE.md if new patterns were established.\n\nAuto-reflection unavailable — claude binary not found or failed.\n`;
}
