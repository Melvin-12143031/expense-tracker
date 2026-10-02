---
name: react-app-fix-and-verify
description: "Use when debugging, implementing, or improving a React/Vite app feature: inspect the relevant code path, fix the root cause, validate the smallest relevant behavior, and confirm the change is safe before finishing."
---

# React App Fix and Verify

Use this skill when working in a small React or Vite project where the goal is to fix a bug, implement a feature, or improve behavior without broad, risky changes.

## Goal

Deliver a safe, minimal, testable fix that matches the user request and leaves the project in a working state.

## Workflow

### 1. Clarify the expected behavior

Start by confirming:
- What is broken, missing, or desired?
- Which screen, component, or data flow is involved?
- What is the smallest successful outcome?

If the request is vague, ask one focused clarifying question before changing code.

### 2. Inspect the relevant code path

Read only the files needed to trace the bug or feature:
- the main component or screen involved
- related child components and data sources
- config or data files only if the issue depends on them

Prefer reading the exact call path over broad file scans. The goal is to find the root cause, not to rewrite the structure.

### 3. Identify the root cause before editing

Decide what is actually failing:
- incorrect state logic
- missing props or event wiring
- stale data or bad transformations
- mismatched rendering or conditional branches

Do not patch symptoms until the cause is understood. If the issue appears in a UI flow, trace the relevant state updates and render path end-to-end.

### 4. Apply the smallest correct change

Implement a focused fix:
- keep edits local to the relevant component or file
- preserve project conventions and naming patterns
- avoid unrelated refactors or cleanup while fixing the issue

When possible, prefer a direct fix over a more abstract redesign.

### 5. Validate the changed behavior

Run the smallest relevant verification command:
- app build or dev server startup if the change affects render or runtime behavior
- a targeted lint or test command if present
- a manual check of the changed UI flow if no automated validation exists

If the project has no test suite, validate by running the app and checking the specific behavior you changed.

### 6. Review before finishing

Before declaring success, confirm:
- the bug is fixed or the feature works as expected
- no obvious side effects were introduced
- the app still starts or builds without breaking unrelated code
- the final output clearly states what changed and how it was verified

## Decision Points

- If the issue is UI-only and isolated, inspect the component and its props/state first.
- If the issue involves data loading or persistence, inspect the data source and transformation path next.
- If the request is ambiguous, ask a clarifying question before implementing.
- If multiple fixes seem possible, choose the one that addresses the root cause with the least risk.
- If validation is not available, do a direct manual verification in the running app.

## Quality Criteria

A change is ready when all of the following are true:
- The user request is addressed directly.
- The root cause was identified and fixed, not masked.
- The solution is minimal and consistent with the app's existing structure.
- The affected behavior was verified with the smallest relevant check.
- The final answer explains the outcome and the validation method clearly.

## Output Expectations

When using this skill, provide:
1. a brief summary of the root cause
2. the change that was made
3. the validation performed
4. any caveats or follow-up notes, if relevant

Keep the response concise, technical, and evidence-based.
