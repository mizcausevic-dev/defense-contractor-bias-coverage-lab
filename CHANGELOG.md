# Changelog

## [0.1] — 2026-05-30

### Added

- Initial schema + validator + canonical example.
- **15 dimension IDs** spanning veteran status (VEVRAA + protected-veteran 4212), disability (Section 503), EEO-1 race/ethnicity/gender/national-origin, ADEA age, security-clearance tier distribution + denial rate + polygraph success, Equal Pay Act compensation equity, SBA sub-contractor SB/SDB/VOSB/SDVOSB classification, NISPOM insider-threat flag rate, promotion velocity, training spend per capita.
- **14 regulatory basis enum values** spanning VEVRAA, Section 503, Title VII, ADEA, EPA 29 CFR Part 1602, OFCCP 41 CFR 60, EO 11246, EO 12968, 32 CFR 147 adjudicative guidelines, ADA Amendments, NISPOM insider-threat 32 CFR 117, Service Contract Act, Davis-Bacon, Small Business Act.
- **8 metric kinds**: selection rate, OFCCP 4/5ths-rule adverse-impact-ratio, denial rate, compensation gap %, promotion velocity ratio, flow-down coverage %, flag rate per 1000, training spend ratio.
- **8 decision domains**: hiring, promotion, security-clearance-access-decision, subcontractor-flow-down, compensation, training-allocation, termination, insider-threat-program-flag.
- 3 invariants enforced:
  - **#1** veteran-keyed dimensions must include `vevraa-38-usc-4212` basis
  - **#2** clearance-keyed dimensions must cite EO 12968 AND 32 CFR 147 adjudicative guidelines
  - **#3** adverse-impact-ratio metric requires comparator AND reference subgroups
- Canonical example: Stratos Aerospace × Q3 2026 security-clearance access decisions; 4,820-employee population; 612 AI-assisted decisions; 9 dimensions reported.
- 6 unit tests + 3 negative invariant tests.
- Framing note: population-level only, no individual records reproduced.

### Not yet

- Cross-vertical bias-coverage diff against `employment-candidate-bias-coverage-lab` (sibling HR Tech surface).
- Intersectional analysis (e.g. women-of-color + protected-veteran joint subgroup).
- Bayesian posterior estimation for small-sample dimensions (currently flagged `insufficient-data`).
- Polygraph-success-rate dimension example data (privacy-sensitive; deferred until anonymization technique selected).
