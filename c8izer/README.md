# c8izer — Contract Complexity Classifier

`c8izer` is a semantic analysis tool that classifies **Semantic Contracts**
into a **Software Complexity Band**.

It does **not** design systems, generate code, or propose architectures.
Its sole responsibility is to **classify** contracts based on their
*structural and systemic properties*.

---

## Purpose

`c8izer` answers one question:

> **At what level of software complexity does this contract operate?**

This classification is used to decide whether a contract can be:
- directly materialized into code
- decomposed into sub-contracts
- escalated to architectural or organizational design

---

## What c8izer Analyzes

Input:
- One **Contract**
- All referenced **Concepts**

Analysis is strictly based on:
- IO boundaries
- State requirements
- Traversal or materialization obligations
- External or distributed boundaries
- Lifecycle or operational claims

---

## What c8izer Explicitly Ignores

- Domain importance (math, crypto, finance, AI, etc.)
- Algorithmic sophistication
- Performance assumptions
- Implementation strategies
- Technology stacks

Semantic rigor **does not reduce** complexity.

---

## Output

`c8izer` produces a strict JSON result:

```json
{
  "band": { "min": 11, "max": 20 },
  "dominantDrivers": ["Structured output"],
  "justification": "…",
  "assumptions": ["…"]
}
```

- Always a **range**, never a single value
- Classified by the **maximum applicable driver**
- Conservative if information is missing

---

## Typical Usage

```bash
c8izer examples/prime/contracts/prime_factorization.yaml
```

---

## Role in the Pipeline

```
Concepts + Contracts
        ↓
      c8izer
        ↓
Materialize (m7izer) or Decompose
```

`c8izer` is **descriptive**, not prescriptive.

---

## Complexity Bands (Excerpt)

- **1–10**  Pure computation, no IO, no state
- **11–20** Local structure, structured outputs
- **21–30** Traversal, materialization, generators
- **31+**   Distributed, platform, operational concerns

---

## Non-Goals

- No system design
- No refactoring advice
- No optimization suggestions

---

## Summary

`c8izer` is a **routing tool**.
It ensures that automation is only applied where it is semantically justified.
