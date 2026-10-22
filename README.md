# Shiplap Math

Shiplap wall board arithmetic. The wall of 20 ft at 8 ft tall takes 16 courses of 2 boards each, 32 boards in all.

## What it computes

- **The boards truth** - courses and boards: the wall (1 to 1000 ft long, 1 to 100 ft tall) divided by the exposure (1 to 24 inches) and the board length (1 to 24 ft), each rounded up.
- **The cover truth** - cover: the exposure times the board length, in square feet.
- **The nails truth** - nails: the boards (1 to 1000000) times the nails each (1 to 100), and the boxes (nails per box 1 to 100000) rounded up.
- **The cost truth** - cost: the boards and boxes at their prices (0.01 to 10000 dollars), and what that is per square foot of wall.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any wall and does not know the openings, the waste, the gaps, the moisture or the local building rules, and it gives no verdict that a wall is sound. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/shiplapmath/
Repo: https://github.com/iLanis-agent/shiplapmath
