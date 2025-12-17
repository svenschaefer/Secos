# Concepts & Contracts

This repository defines a minimal, formal foundation for building complex software systems,
particularly in environments that involve automation and AI.

The approach described here is referred to as **SoCos** — *Semantic Contracts*.

> **Code is a derivative. Semantics is the architecture.**

The model separates **meaning** (Concepts) from **obligation** (Contracts) and treats both as
first-class, versioned primary artifacts. Everything else — code, tests, documentation —
is derived.

---

## Executive Summary

**Semantic Contracts** define a semantics-first approach to software systems in which
requirements are treated as **normative, versioned primary artifacts**.

Implementations—including source code, tests, and other executable artifacts—are
**systematically derived** from semantic definitions rather than acting as the source of truth.
By structuring meaning and obligation explicitly, systems can be decomposed along
**formal complexity boundaries**, enabling scalable reasoning, verification, and automation,
up to and including automated code generation.

---

## Vision

We envision software systems in which **semantics, not code, define the architecture**.

In this vision, meaning and obligation are explicit, stable, and independently versioned.
Code, tests, and other implementation artifacts are transient expressions of these semantics,
continuously derivable as systems evolve.

This shift enables long-lived correctness, technological flexibility, and AI-assisted automation
without sacrificing clarity or control.

---

## Mission

The mission of **SoCos** is to establish **Semantic Contracts** as a foundational model for
building complex software systems.

Specifically, SoCos aims to:

- Treat **requirements and obligations as normative, versioned primary artifacts**
- Enable the **systematic derivation** of implementations from semantic definitions
- Support the **semi-automated decomposition of requirements into contracts**
  along formal complexity boundaries
- Provide a principled path from semantic intent to **verifiable systems and automated code generation**

---

## Concepts

A **Concept** defines meaning.

- Language-independent
- Normative
- Versioned
- Implementation-agnostic

Concepts answer:

> *What is this?*

A Concept defines a semantic set. It does not describe behavior, structure, or execution.

---

## Contracts

A **Contract** defines obligation.

- Normative commitment
- Versioned and immutable once published
- Independent of implementation and execution

Contracts answer:

> *What is guaranteed?*

A Contract may reference Concepts to define its guarantees precisely and unambiguously.

---

## Inputs & Outputs

Contracts explicitly declare their **required inputs and outputs**.

- Each input or output is defined either by a primitive `type` or by a semantic `concept`
- Inputs and outputs define the data boundary of a contract
- No execution model or control flow is implied

---

## Guarantees

Contracts contain one or more **semantic guarantees** expressed in natural language.

- Guarantees are normative statements
- Guarantees may reference Concepts using square-bracket anchors (e.g. `[prime_number]`)
- Guarantees define truth, not verification

---

## Acceptance

A Contract may optionally define **acceptance criteria**.

Acceptance criteria describe **how fulfillment of a contract can be verified**, without
redefining its meaning or obligation.

- Acceptance is operational, not normative
- Acceptance does not replace guarantees
- Acceptance enables test generation and verification
- Acceptance may reference Concepts using semantic anchors

Guarantees define **what is true**.  
Acceptance defines **how truth can be demonstrated**.

---

## Derivation

Concepts and Contracts are **primary artifacts**.

From them, secondary artifacts may be derived, including:

- Source code
- Tests
- Documentation
- Examples
- Stubs and mocks

Derived artifacts are **not normative**.

Changing a derived artifact does not change the system.  
Changing semantics does.

---

## Versioning

Concepts and Contracts are immutable once published.

- Any semantic change requires a new version
- Version identifiers are explicit and stable
- Consumers may rely on published versions as normative references

---

## Non-Goals

This foundation explicitly does **not** define or prescribe:

- Execution models
- Control flow or orchestration
- Runtime architectures
- Service decomposition
- Technology stacks
- Programming languages
- Deployment concerns

These concerns are intentionally treated as **derivative layers** built on top of semantic definitions.

---

## Why this exists

Modern software systems increasingly rely on automation and AI.
In such systems, code alone is no longer a stable source of truth.

**SoCos** establishes semantics as the stable foundation,
allowing code, tests, and implementations to remain replaceable.
