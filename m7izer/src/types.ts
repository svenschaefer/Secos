export type Concept = {
  concept: string;
  version: string;
  definition: string;
};

export type Contract = {
  contract: string;
  version: string;
  inputs: Record<string, { type?: string; concept?: string }>;
  outputs: Record<string, { type?: string; concept?: string }>;
  guarantees: { semantic: string[] };
};
