# m7izer — Contract Materializer

`m7izer` is a **materialization tool** that derives executable artifacts
from **Semantic Contracts**.

It operates only on contracts that are sufficiently low in complexity
to be materialized without architectural inference.

---

## Purpose

`m7izer` answers the question:

> **Can this contract be directly turned into code — and if so, how?**

It transforms semantic obligations into concrete, inspectable artifacts.

---

## Inputs

- One **Contract**
- All referenced **Concepts**
- (Optionally) a prior complexity classification

Contracts are treated as **normative**.
Code is always **derivative**.

---

## Outputs

Depending on configuration and target:

- Source code (e.g. Python, TypeScript)
- Stubs or skeletons
- Generated documentation
- Testable artifacts

All output is written to:

```
generated/<contract_name>/
```

---

## Scope & Limits

`m7izer` is intentionally limited to:

- **Complexity Band ≤ 20**
- Local computation
- Structured outputs
- No implicit IO, state, or orchestration

If a contract exceeds this scope, it must be:
- decomposed
- or redesigned before materialization

---

## Typical Usage

```bash
m7izer examples/prime/contracts/prime_factorization.yaml
```

---

## Role in the Pipeline

```
Concepts + Contracts
        ↓
      c8izer
        ↓
      m7izer
        ↓
   Generated Code
```

---

## Design Principles

- No hidden assumptions
- No architectural invention
- No control-flow inference
- Deterministic output

---

## Non-Goals

- System design
- Runtime orchestration
- Distributed systems
- Performance tuning

---

## Summary

`m7izer` turns **semantic intent into concrete artifacts**
— but only where this can be done safely and mechanically.
