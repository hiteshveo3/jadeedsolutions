#!/usr/bin/env node
/**
 * `next dev` with its own build folder, so a second dev server (e.g. one testing the
 * dashboard) can run beside another one in this folder without both writing to .next.
 *   node scripts/dev-isolated.mjs 3005
 * Works from any folder: it always runs in this project.
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = process.argv[2] ?? "3005";
const child = spawn(process.execPath, [path.join(root, "node_modules/next/dist/bin/next"), "dev", "-p", port], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, JADEED_BUILD_DIR: process.env.JADEED_BUILD_DIR ?? ".next-dash" },
});
child.on("exit", (code) => process.exit(code ?? 0));
