#!/usr/bin/env node
import "dotenv/config";
import fs from "fs";
import path from "path";
import YAML from "yaml";

import { loadConcepts } from "./concepts.js";
import { materialize } from "./materializer.js";
import { Contract } from "./types.js";

const file = process.argv[2];
if (!file) {
  console.error("Usage: m7izer <contract.yaml>");
  process.exit(1);
}

// --- load & parse contract ---------------------------------------------------

const raw = fs.readFileSync(file, "utf8");
const contract = YAML.parse(raw) as Contract;

if (!contract.contract || !contract.version) {
  console.error("Invalid contract");
  process.exit(1);
}

// --- load concepts (single source of truth) ----------------------------------
// IMPORTANT:
// - collectConceptIds is INTERNAL to concepts.ts
// - cli MUST NOT call it
// - loadConcepts is async and MUST be awaited

const concepts = await loadConcepts(contract, file);

// --- prepare output directory ------------------------------------------------

const outDir = path.join("generated", contract.contract);
fs.mkdirSync(outDir, { recursive: true });

// --- materialize -------------------------------------------------------------
// materializer already returns code (this used to work!)

const code = await materialize(contract, concepts);

fs.writeFileSync(path.join(outDir, "code.py"), code);

// --- done --------------------------------------------------------------------

console.log(`✔ Materialized ${contract.contract}`);
