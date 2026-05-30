// Public surface for the DefenseTech bias-coverage lab.

export const DIMENSION_IDS = [
  "veteran-status-vevraa",
  "protected-veteran-status-vevraa-4212",
  "disability-status-section-503",
  "race-ethnicity-eeo-1",
  "gender-eeo-1",
  "national-origin-eeo-1",
  "age-adea",
  "security-clearance-tier-distribution",
  "clearance-denial-rate",
  "polygraph-success-rate",
  "compensation-equity-equal-pay-act",
  "subcontractor-sb-sdb-vosb-classification",
  "insider-threat-flag-rate",
  "promotion-velocity",
  "training-spend-per-capita"
];

export function summarize(report) {
  const breakdown = report.coverage_dimensions.reduce((acc, d) => {
    acc[d.outcome] = (acc[d.outcome] ?? 0) + 1; return acc;
  }, {});
  return {
    report_id: report.report_id,
    decision_domain: report.scope.decision_domain,
    population_size: report.population_metrics.population_size,
    ai_assisted_decision_count: report.population_metrics.ai_assisted_decision_count,
    dimension_count: report.coverage_dimensions.length,
    outcome_breakdown: breakdown
  };
}
