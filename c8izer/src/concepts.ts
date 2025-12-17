import { readFileSync } from "fs";
import { dirname, join } from "path";
import { parse } from "yaml";

/**
 * Loads all referenced concept definitions for a given contract.
 * 
 * Concepts are discovered via:
 * - explicit `concept: <id>` fields
 * - bracket references like `[concept_id]` inside strings
 */
export async function loadConcepts(
  contract: any,
  contractPath: string
): Promise<string[]> {
  const refs = new Set<string>();

  collectConceptRefs(contract, refs);

  const baseDir = dirname(contractPath);
  const conceptsDir = join(baseDir, "concepts");

  const results: string[] = [];

  for (const ref of refs) {
    try {
      const file = join(conceptsDir, `${ref}.yaml`);
      const yaml = readFileSync(file, "utf-8");
      results.push(yaml);
    } catch {
      // concept file missing → ignore silently
      // (concept semantics may be external or implicit)
    }
  }

  return results;
}

/**
 * Recursively walks an object and collects concept references.
 */
function collectConceptRefs(value: any, refs: Set<string>) {
  if (value == null) return;

  // String: scan for [concept] references
  if (typeof value === "string") {
    for (const match of value.matchAll(/\[([^\]]+)\]/g)) {
      refs.add(match[1]);
    }
    return;
  }

  // Non-object → nothing to do
  if (typeof value !== "object") return;

  // NEW: explicit concept field
  if (typeof (value as any).concept === "string") {
    refs.add((value as any).concept);
  }

  // Recurse into all object values
  for (const v of Object.values(value)) {
    collectConceptRefs(v, refs);
  }
}
