# chittycan — RETIRED

This repository is **archived and superseded**.

The canonical ChittyCan CLI lives at **[CHITTYOS/chittycan](https://github.com/CHITTYOS/chittycan)**
and is published to npm as [`chittycan`](https://www.npmjs.com/package/chittycan).

```bash
npm install -g chittycan   # provides the `can` binary
```

## Why this repo was retired

This repo was an independent duplicate (not a git fork) that stopped at `v0.4.0`
on 2026-02-22. It declared the same `bin: { "can": "dist/index.js" }` entry as the
canonical package, so installing from here would shadow the real `can` binary.

Every document that once lived only here — `INVESTOR_PITCH.md`,
`COMPETITIVE_ANALYSIS.md`, `MIGRATION_PLAYBOOK.md`, `QUICKSTART.md`, `VISION.md`,
and the rest — was already carried over to `CHITTYOS/chittycan` under `docs/`.
No content was lost in retiring this repository.

Git history remains readable here. Nothing new will be merged.
