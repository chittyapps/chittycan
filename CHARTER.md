# ChittyCan Charter

## Classification
- **Canonical URI**: `chittycanon://core/services/chittycan`
- **Tier**: 3 (Operational)
- **Organization**: chittyapps
- **Domain**: chittycan.chitty.cc

## Mission

ChittyCan is the project orchestration and standards service for the ChittyOS ecosystem.

## Scope

### IS Responsible For
- Project orchestration, standards enforcement, development workflow management

### IS NOT Responsible For
- Identity generation (ChittyID)
- Token provisioning (ChittyAuth)

## Dependencies

| Type | Service | Purpose |
|------|---------|---------|
| Upstream | ChittyAuth | Authentication |

## API Contract

**Base URL**: https://chittycan.chitty.cc

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Service health |

## Ownership

| Role | Owner |
|------|-------|
| Service Owner | chittyapps |

## Compliance

- [ ] Registered in ChittyRegister
- [ ] Health endpoint operational at /health
- [ ] CLAUDE.md present
- [ ] CHARTER.md present
- [ ] CHITTY.md present

---
*Charter Version: 1.0.0 | Last Updated: 2026-02-21*