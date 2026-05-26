# Styles

`tokens.css` is the single source of truth. Never edit a value in a component —
add or update the token here.

## Token categories
[auto-filled by init: lists all --custom-properties and their current values]

## Layer order
```
@layer reset, tokens, base, components, utilities
```
Component styles → `@layer components`. One-off overrides → `@layer utilities`.

## Scoped command
```
npm run build   # CSS errors surface in build output
```
