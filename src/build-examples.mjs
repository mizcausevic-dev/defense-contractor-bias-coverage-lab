import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "../examples/stratos-bias-coverage-2026q4.json");

const report = {
  report_id: "STRATOS-BIAS-2026Q4",
  schema_version: "0.1",
  generated_at: "2026-11-30T17:00:00Z",
  framing_note: "Population-level bias coverage for AI-assisted DIB workforce decisions. Per OFCCP guidance and this lab's standing posture, all measurements use aggregated counts and ratios — no individual records are reproduced or attributed.",
  contractor: {
    cage_code_tokenized: "tok_cage_STRATOS_AERO_1A2B3",
    ai_systems_in_scope: [
      { name: "VendorD GuardianAI v3.x (HR adjunct module)", role: "RFP-related workforce planning + flow-down classification" },
      { name: "VendorH PolygraphAssist", role: "polygraph-question-bank generator for clearance maintenance" }
    ]
  },
  scope: {
    decision_domain: "security-clearance-access-decision",
    measurement_window: { from: "2026-07-01", to: "2026-09-30" }
  },
  population_metrics: {
    population_size: 4820,
    ai_assisted_decision_count: 612
  },
  coverage_dimensions: [
    {
      dimension_id: "veteran-status-vevraa",
      regulatory_basis: ["vevraa-38-usc-4212", "ofccp-41-cfr-60"],
      subgroups: ["veteran", "non-veteran"],
      metric_kind: "adverse-impact-ratio",
      outcome: "within-tolerance",
      measurement: { comparator_subgroup: "non-veteran", reference_subgroup: "veteran", value: 0.94, tolerance_band: { lower: 0.80, upper: 1.20 } },
      notes: "Within OFCCP 4/5ths-rule tolerance band; veteran preference functioning."
    },
    {
      dimension_id: "protected-veteran-status-vevraa-4212",
      regulatory_basis: ["vevraa-38-usc-4212"],
      subgroups: ["protected-veteran", "non-protected"],
      metric_kind: "selection-rate",
      outcome: "within-tolerance",
      measurement: { value: 0.21 }
    },
    {
      dimension_id: "disability-status-section-503",
      regulatory_basis: ["section-503-rehabilitation-act", "ofccp-41-cfr-60"],
      subgroups: ["self-identified-disability", "no-disability-disclosed"],
      metric_kind: "selection-rate",
      outcome: "approaching-threshold",
      measurement: { value: 0.06 },
      notes: "Below 7% utilization goal; intervention recommended."
    },
    {
      dimension_id: "race-ethnicity-eeo-1",
      regulatory_basis: ["title-vii-civil-rights-act", "ofccp-41-cfr-60", "eo-11246-equal-employment-opportunity"],
      subgroups: ["white", "black-or-african-american", "hispanic-latino", "asian", "two-or-more"],
      metric_kind: "adverse-impact-ratio",
      outcome: "within-tolerance",
      measurement: { comparator_subgroup: "black-or-african-american", reference_subgroup: "white", value: 0.86, tolerance_band: { lower: 0.80, upper: 1.20 } }
    },
    {
      dimension_id: "security-clearance-tier-distribution",
      regulatory_basis: ["eo-12968-personnel-security-access", "adjudicative-guidelines-32-cfr-147"],
      subgroups: ["secret", "top-secret", "ts-sci"],
      metric_kind: "selection-rate",
      outcome: "within-tolerance",
      measurement: { value: 0.42 },
      notes: "Distribution of held clearance tiers across population; no AI-recommended denials in this window."
    },
    {
      dimension_id: "clearance-denial-rate",
      regulatory_basis: ["eo-12968-personnel-security-access", "adjudicative-guidelines-32-cfr-147"],
      subgroups: ["initial-applicants", "renewal-applicants"],
      metric_kind: "denial-rate",
      outcome: "insufficient-data",
      notes: "Denial events below statistical reporting threshold (<20 in window) — reported as insufficient-data per OFCCP guidance to avoid de-anonymization."
    },
    {
      dimension_id: "compensation-equity-equal-pay-act",
      regulatory_basis: ["equal-pay-act-29-cfr-part-1602", "title-vii-civil-rights-act"],
      subgroups: ["men", "women", "non-binary-or-unspecified"],
      metric_kind: "compensation-gap-percent",
      outcome: "within-tolerance",
      measurement: { value: -2.4, tolerance_band: { lower: -5, upper: 5 } },
      notes: "Adjusted-pay gap of -2.4% (women earn 2.4% less than men in matched-role pairs); within OFCCP investigation threshold."
    },
    {
      dimension_id: "subcontractor-sb-sdb-vosb-classification",
      regulatory_basis: ["small-business-act-15-usc-631", "ofccp-41-cfr-60"],
      subgroups: ["small-business", "small-disadvantaged-business", "veteran-owned-small-business", "service-disabled-veteran-owned"],
      metric_kind: "flow-down-coverage-percent",
      outcome: "within-tolerance",
      measurement: { value: 27.8 },
      notes: "Above 23% small-business prime-contract floor; SDVOSB participation at 4.1%, above 3% set-aside floor."
    },
    {
      dimension_id: "insider-threat-flag-rate",
      regulatory_basis: ["nispom-insider-threat-32-cfr-117"],
      subgroups: ["population-overall", "ai-flagged-subset"],
      metric_kind: "flag-rate-per-1000",
      outcome: "approaching-threshold",
      measurement: { value: 6.3 },
      notes: "Flag rate above prior-quarter baseline (4.1/1000); manual review of AI-flagged subset recommended for false-positive analysis. NISPOM Conforming Change 2 references included."
    }
  ],
  interventions_recommended: [
    { dimension_id: "disability-status-section-503", action: "Increase Section 503 sourcing channels; engage AAPD + Bender consultants partnership." },
    { dimension_id: "insider-threat-flag-rate", action: "Manual review of 38 AI-flagged events from Sep 2026; document false-positive rate; calibrate threshold." }
  ]
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(report, null, 2) + "\n", "utf8");
console.log(`built bias-coverage report (${report.coverage_dimensions.length} dimensions) → ${OUT}`);
