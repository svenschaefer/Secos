import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { parse } from "yaml";

export function collectConceptIds(value: any): Set<string> {
  const refs = new Set<string>();
  collect(value, refs);
  return refs;
}

function collect(value: any, refs: Set<string>) {
  if (value == null) return;

  if (typeof value === "string") {
    for (const m of value.matchAll(/\[([a-zA-Z0-9_]+)\]/g)) {
      refs.add(m[1]);
    }
    return;
  }

  if (typeof value !== "object") return;

  if (typeof (value as any).concept === "string") {
    refs.add((value as any).concept);
  }

  for (const v of Object.values(value)) {
    collect(v, refs);
  }
}

export async function loadConcepts(contract: any, contractPath: string) {
  const ids = collectConceptIds(contract);

  // Contract identifier is never a concept
  if (typeof contract.contract === "string") {
    ids.delete(contract.contract);
  }

  const contractsDir = dirname(contractPath);
  const domainDir = dirname(contractsDir);
  const conceptsDir = join(domainDir, "concepts");

  const concepts: Record<string, any> = {};

  for (const id of ids) {
    const file = join(conceptsDir, `${id}.yaml`);
    if (!existsSync(file)) continue;
    const yaml = readFileSync(file, "utf-8");
    concepts[id] = parse(yaml);
  }

  return concepts;
}
