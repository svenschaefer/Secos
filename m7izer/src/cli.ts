#!/usr/bin/env node
import "dotenv/config";
import fs from "fs";
import path from "path";
import YAML from "yaml";
import { collectConceptIds, loadConcepts } from "./concepts.js";
import { materialize } from "./materializer.js";
import { Contract } from "./types.js";

const file = process.argv[2];
if (!file) {
  console.error("Usage: m7izer <contract.yaml>");
  process.exit(1);
}

const raw = fs.readFileSync(file, "utf8");
const contract = YAML.parse(raw) as Contract;

if (!contract.contract || !contract.version) {
  console.error("Invalid contract");
  process.exit(1);
}

const ids = collectConceptIds(contract);
const concepts = loadConcepts(file, ids);

const outDir = path.join("generated", contract.contract);
fs.mkdirSync(outDir, { recursive: true });

const code = await materialize(contract, concepts);
fs.writeFileSync(path.join(outDir, "code.py"), code);

console.log(`✔ Materialized ${contract.contract}`);
