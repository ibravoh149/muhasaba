@AGENTS.md

# Project Rules

## Tone
- Keep it informal and conversational — no stiff or overly formal language
- Talk to the user like a colleague, not a client

## i18n
- All visible text in the app must use `t()` from `react-i18next` — no hardcoded strings in components
- Every new string must have a key added to `en`, `ar`, `de`, and `fr` locale files
- Do not update `ha`, `yo`, or `ig` locale files until explicitly asked

## Code
- No unnecessary comments — only add one if the WHY is non-obvious
- No unused variables or imports — fix before committing
- Commits must be broken into small logical chunks, not one large dump
- Always run lint and fix errors before committing
