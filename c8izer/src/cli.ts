#!/usr/bin/env node
import { c8ize } from "./c8izer.js";

const [, , contractPath] = process.argv;

if (!contractPath) {
  console.error("Usage: c8izer <contract.yaml>");
  process.exit(1);
}

try {
  const result = await c8ize(contractPath);
  console.log(JSON.stringify(result, null, 2));
} catch (err) {
  console.error("❌ c8izer failed");
  console.error(err);
  process.exit(1);
}