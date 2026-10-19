#!/usr/bin/env node
/**
 * Starts the Firebase Auth, Firestore and Storage emulators for the dashboard and client
 * portal (local development only). Same set-up as Jadeed Marketing, on its own ports so
 * both projects can run at once:
 *   auth 9098 · firestore 8086 · storage 9198 · emulator UI http://127.0.0.1:4002
 *
 * Uses firebase-tools v13 (works with Java 17; v14+ needs Java 21) and a short Java temp
 * folder, which avoids Windows' "Unable to establish loopback connection". The project is a
 * "demo-" project, so nothing ever touches Google Cloud. Data is kept between runs in
 * firebase/emulator-data (gitignored): exported on a normal exit and every 10 minutes.
 */
import { exec, spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const PROJECT = "demo-jadeed-solutions";
// A short folder with no spaces: JAVA_TOOL_OPTIONS splits on spaces ("Sameer Ahmad Basra"
// in the home path broke it) and long paths break Java's loopback socket on Windows.
const tmp = path.join(path.parse(os.homedir()).root, "jt");
fs.mkdirSync(tmp, { recursive: true });
const dataDir = "firebase/emulator-data";
const args = ["--yes", "firebase-tools@13", "emulators:start", "--only", "auth,firestore,storage", "--project", PROJECT, "--export-on-exit", dataDir];
if (fs.existsSync(dataDir)) args.push("--import", dataDir);

const child = spawn("npx", args, {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, JAVA_TOOL_OPTIONS: `-Djdk.net.unixdomain.tmpdir=${tmp} -Djava.io.tmpdir=${tmp}` },
});

const EXPORT_EVERY_MS = 10 * 60 * 1000;
const timer = setInterval(() => {
  exec(`npx --yes firebase-tools@13 emulators:export ${dataDir} --force --project ${PROJECT}`, (error) => {
    if (error) console.error("[emulators] Periodic export failed:", error.message.split("\n")[0]);
    else console.log(`[emulators] Data saved to ${dataDir}`);
  });
}, EXPORT_EVERY_MS);

child.on("exit", (code) => {
  clearInterval(timer);
  process.exit(code ?? 0);
});
