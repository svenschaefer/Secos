import { openai } from "./openai.js";
import { Contract, Concept } from "./types.js";

export async function materialize(
  contract: Contract,
  concepts: Record<string, Concept>
): Promise<string> {
  const prompt = `You are a code generator.

Your task is to materialize the given Contract into a Python implementation.

ABSOLUTE RULES (MUST be followed exactly):
- Output ONLY valid, executable Python code
- Output NO markdown, NO comments, NO explanations, NO extra text
- Define EXACTLY ONE top-level function
- The function name MUST be exactly: ${contract.contract}
- The function signature MUST accept exactly the inputs defined in the contract
- The function MUST return EXACTLY ONE object (dict)
- The returned object MUST have EXACTLY the keys defined in the contract outputs
- Each output value MUST have the correct type as defined in the contract
- DO NOT simplify outputs to primitives (e.g. do NOT return a boolean if an object is required)
- DO NOT add extra fields
- DO NOT omit fields
- DO NOT rename fields

SEMANTIC RULES:
- The function MUST correctly implement all semantic guarantees of the contract
- Concepts define normative meaning and MUST be respected exactly
- If an input does not satisfy the semantic requirements, the function MUST still return a correctly shaped output object

FORBIDDEN:
- No helper functions
- No classes
- No imports
- No I/O
- No printing
- No global state
- No side effects

Spec (this is the ONLY source of truth):
${JSON.stringify({ contract, concepts }, null, 2)}
`;

  const r = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [{ role: "user", content: prompt }],
    temperature: 0
  });

  return r.choices[0].message.content ?? "";
}
