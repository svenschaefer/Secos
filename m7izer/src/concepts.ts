import fs from "fs";
import path from "path";
import YAML from "yaml";
import { Contract, Concept } from "./types.js";

const anchorRe = /\[([a-z][a-z0-9_]*)\]/g;

export function collectConceptIds(contract: Contract): string[] {
  const ids = new Set<string>();

  for (const v of Object.values(contract.inputs || {})) {
    if (v.concept) ids.add(v.concept);
  }
  for (const v of Object.values(contract.outputs || {})) {
    if (v.concept) ids.add(v.concept);
  }
  for (const g of contract.guarantees.semantic || []) {
    let m;
    while ((m = anchorRe.exec(g)) !== null) {
      ids.add(m[1]);
    }
  }

  return [...ids].sort();
}

export function loadConcepts(
  contractPath: string,
  ids: string[]
): Record<string, Concept> {
  const contractDir = path.dirname(contractPath);

  if (!contractDir.endsWith("contracts")) {
    throw new Error("Contract must be located in a 'contracts/' directory");
  }

  const domainRoot = path.dirname(contractDir);
  const conceptsDir = path.join(domainRoot, "concepts");

  const out: Record<string, Concept> = {};

  for (const id of ids) {
    const file = path.join(conceptsDir, `${id}.yaml`);
    if (!fs.existsSync(file)) {
      throw new Error(`Missing concept '${id}' at ${file}`);
    }
    out[id] = YAML.parse(fs.readFileSync(file, "utf8"));
  }

  return out;
}
