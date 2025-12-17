# Examples — Semantic Domains

The `examples/` directory contains **domain-specific semantic artifacts**
used by both `c8izer` and `m7izer`.

These artifacts are **primary**, **normative**, and **versioned**.

---

## Structure

```
examples/
├─ <domain>/
│  ├─ concepts/
│  └─ contracts/
```

Each domain is self-contained.

---

## Concepts

Located in:

```
examples/<domain>/concepts/
```

Concepts define **meaning**, not behavior.

- Language-independent
- Immutable once published
- Referenced by contracts via `concept:` or `[concept_id]`

---

## Contracts

Located in:

```
examples/<domain>/contracts/
```

Contracts define **obligations** and guarantees.

- Versioned
- Normative
- Independent of implementation
- May reference Concepts

---

## Tooling Usage

Examples serve as:

- Input for `c8izer` (complexity classification)
- Input for `m7izer` (materialization)
- Canonical references for testing and validation

---

## Design Rules

- Concepts and Contracts must not overlap
- A Contract identifier is never a Concept
- Variables (e.g. `n`, `p`, `q`) are not Concepts
- Domains own their Concepts

---

## Why Centralized

Keeping examples centralized ensures:

- Consistent semantics across tools
- No duplication or drift
- Reproducible analysis and generation

---

## Summary

`examples/` is the **semantic backbone** of the repository.

All tooling derives from what is defined here — never the other way around.
