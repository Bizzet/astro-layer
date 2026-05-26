// Utility for reading and writing .claude/build-state.json atomically.
import { readFileSync, writeFileSync, renameSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { randomBytes } from 'node:crypto';

const STATE_FILE = '.claude/build-state.json';

/**
 * Reads .claude/build-state.json from projectRoot.
 * Returns the parsed object, or null if the file does not exist.
 */
export function readBuildState(projectRoot) {
  const statePath = join(projectRoot, STATE_FILE);
  try {
    const raw = readFileSync(statePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Writes .claude/build-state.json atomically (write to temp file, then rename).
 * Ensures partial writes do not corrupt existing state.
 */
export function writeBuildState(projectRoot, state) {
  const statePath = join(projectRoot, STATE_FILE);
  const stateDir = dirname(statePath);

  try {
    mkdirSync(stateDir, { recursive: true });
  } catch {
    // Directory already exists — ignore
  }

  const tmp = join(tmpdir(), `build-state-${randomBytes(6).toString('hex')}.json`);
  writeFileSync(tmp, JSON.stringify(state, null, 2), 'utf-8');
  renameSync(tmp, statePath);
}
