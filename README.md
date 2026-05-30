# defense-contractor-bias-coverage-lab

> **DefenseTech bias-coverage scaffolding (Spec #4 of the DefenseTech 6-pack).** Population-level coverage lab for AI-assisted decisions across the defense-industrial-base workforce — VEVRAA veteran preference, Section 503 disability, OFCCP Title-VII / EO 11246, ADEA, EPA compensation equity, security-clearance access patterns (EO 12968 + 32 CFR 147 adjudicative guidelines), NISPOM insider-threat-program disparity, and SBA small-business / SDB / VOSB sub-contractor flow-down.

Part of the [Kinetic Gain Protocol Suite](https://suite.kineticgain.com).

> Status: v0.1 draft. **15 dimension IDs** across **8 decision domains**, validated by schema + 3 invariants. Canonical example for Stratos Aerospace × VendorD GuardianAI v3.x.

## Regulatory floor

- **VEVRAA** (38 USC 4212) — Vietnam Era Veterans' Readjustment Assistance Act + protected veteran preference
- **Section 503 of the Rehabilitation Act** — affirmative action for individuals with disabilities (7% utilization goal)
- **Title VII of the Civil Rights Act** + **OFCCP 41 CFR 60** — federal contractor employment discrimination prohibitions
- **EO 11246** — Equal Employment Opportunity in federal contracting
- **ADEA** (29 USC 621) — Age Discrimination in Employment Act
- **Equal Pay Act** (29 CFR Part 1602) — gender-based pay discrimination prohibition
- **EO 12968** + **adjudicative guidelines** (32 CFR 147) — Personnel Security Access criteria for clearance decisions
- **NISPOM** (32 CFR 117) + **Conforming Change 2** — Insider Threat Program at cleared facilities
- **Small Business Act** (15 USC 631) — SB / SDB / VOSB / SDVOSB classification for sub-contractor flow-down
- **Service Contract Act** (41 USC 6701) + **Davis-Bacon** (40 USC 3141) — wage-determination floors

## Framing

**Population-level only.** Per OFCCP guidance, all measurements use aggregated counts and ratios; no individual records are reproduced or attributable. Counts below statistical reporting thresholds (typically <20) are reported as `insufficient-data` to avoid de-anonymization. This lab is for the DIB contractor's internal-bias-audit posture and FAR / OFCCP audit readiness — **not** a substitute for OFCCP audit, EEOC investigation, NLRB action, or DOL Wage & Hour Division enforcement.

## 15 dimension IDs encoded

`veteran-status-vevraa` · `protected-veteran-status-vevraa-4212` · `disability-status-section-503` · `race-ethnicity-eeo-1` · `gender-eeo-1` · `national-origin-eeo-1` · `age-adea` · `security-clearance-tier-distribution` · `clearance-denial-rate` · `polygraph-success-rate` · `compensation-equity-equal-pay-act` · `subcontractor-sb-sdb-vosb-classification` · `insider-threat-flag-rate` · `promotion-velocity` · `training-spend-per-capita`.

## 8 metric kinds encoded

`selection-rate` · `adverse-impact-ratio` (OFCCP 4/5ths-rule) · `denial-rate` · `compensation-gap-percent` · `promotion-velocity-ratio` · `flow-down-coverage-percent` · `flag-rate-per-1000` · `training-spend-ratio`.

## 8 decision domains supported

`hiring` · `promotion` · `security-clearance-access-decision` · `subcontractor-flow-down` · `compensation` · `training-allocation` · `termination` · `insider-threat-program-flag`.

## Three invariants enforced

1. **VEVRAA basis invariant** — any dimension keyed on veteran status must include `vevraa-38-usc-4212` in `regulatory_basis`.
2. **Clearance citation invariant** — clearance-related dimensions (`security-clearance-tier-distribution`, `clearance-denial-rate`) must cite BOTH `eo-12968-personnel-security-access` AND `adjudicative-guidelines-32-cfr-147`.
3. **AIR completeness invariant** — `adverse-impact-ratio` metric requires both `comparator_subgroup` AND `reference_subgroup` in `measurement` (you cannot compute a ratio without specifying which two subgroups).

## Canonical example

- **Contractor:** Stratos Aerospace (DIB Tier 2)
- **AI systems:** VendorD GuardianAI v3.x (HR adjunct), VendorH PolygraphAssist
- **Decision domain:** security-clearance-access-decision · Q3 2026
- **Population:** 4,820 employees · 612 AI-assisted decisions in window
- **9 dimensions reported** across VEVRAA, Section 503, EEO-1 race/ethnicity, clearance distribution, clearance denial rate (insufficient-data), compensation equity (EPA), SB/SDB/VOSB sub-contractor flow-down, insider-threat flag rate

## Verify

```bash
npm install
npm run build:examples   # builds canonical 9-dimension report
npm run validate         # schema + 3 invariants
npm test                 # 6 unit tests
```

## Composes with

- [`defense-decision-record-audit-stream`](https://github.com/mizcausevic-dev/defense-decision-record-audit-stream) — per-decision audit events that aggregate into bias-coverage population metrics
- [`defense-ai-incident-card-profile`](https://github.com/mizcausevic-dev/defense-ai-incident-card-profile) — `exceeds-threshold` outcomes become published Incident Cards
- [`dod-cmmc-disclosure-tracker`](https://github.com/mizcausevic-dev/dod-cmmc-disclosure-tracker) — OFCCP + DCMA authority context
- [`employment-candidate-bias-coverage-lab`](https://github.com/mizcausevic-dev/employment-candidate-bias-coverage-lab) — sibling HR Tech bias-coverage lab (broader employer scope)
- [Kinetic Gain Protocol Suite](https://suite.kineticgain.com) — umbrella

## Compliance posture

Bias-coverage **readiness scaffolding** for DIB contractor bias audits. Does NOT constitute OFCCP audit, EEOC investigation, NLRB action, DOL Wage & Hour enforcement, or DCSA security-clearance adjudication. Population-level only — never publishes individual records. Per the standing Suite public-language guardrail: *readiness · evidence · posture · controls · scaffolding* — never "compliant" / "certified" without external attestation.

## License

MIT.
