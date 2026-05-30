import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const HERE = dirname(fileURLToPath(import.meta.url));
const SCHEMA = JSON.parse(readFileSync(resolve(HERE, "../schema/bias-coverage-report.schema.json"), "utf8"));

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const compiled = ajv.compile(SCHEMA);

export function validate(report) {
  const errors = [];
  if (!compiled(report)) {
    for (const e of compiled.errors) errors.push(`schema: ${e.instancePath} ${e.message}`);
    return { ok: false, errors };
  }
  // Invariant#1: any dimension keyed on VEVRAA must include vevraa-38-usc-4212 in regulatory_basis.
  for (const d of report.coverage_dimensions) {
    if (d.dimension_id.includes("veteran") && !d.regulatory_basis.includes("vevraa-38-usc-4212")) {
      errors.push(`invariant#1: dimension ${d.dimension_id} keyed on veteran status MUST include vevraa-38-usc-4212 basis`);
    }
  }
  // Invariant#2: clearance-related dimensions MUST cite EO 12968 + 32 CFR 147 adjudicative guidelines.
  for (const d of report.coverage_dimensions) {
    if (d.dimension_id.startsWith("clearance-") || d.dimension_id === "security-clearance-tier-distribution") {
      const ok = d.regulatory_basis.includes("eo-12968-personnel-security-access") && d.regulatory_basis.includes("adjudicative-guidelines-32-cfr-147");
      if (!ok) errors.push(`invariant#2: dimension ${d.dimension_id} on security clearance MUST cite eo-12968-personnel-security-access + adjudicative-guidelines-32-cfr-147`);
    }
  }
  // Invariant#3: AIR (adverse impact ratio) metric requires both comparator + reference subgroups.
  for (const d of report.coverage_dimensions) {
    if (d.metric_kind === "adverse-impact-ratio") {
      const m = d.measurement ?? {};
      if (!m.comparator_subgroup || !m.reference_subgroup) {
        errors.push(`invariant#3: dimension ${d.dimension_id} uses adverse-impact-ratio metric but lacks comparator_subgroup or reference_subgroup`);
      }
    }
  }
  return { ok: errors.length === 0, errors };
}

const argv1 = (process.argv[1] ?? "").replace(/\\/g, "/");
if (import.meta.url.endsWith("/validate.mjs") && argv1.endsWith("validate.mjs")) {
  const file = process.argv[2] ?? "examples/stratos-bias-coverage-2026q4.json";
  const path = resolve(process.cwd(), file);
  const report = JSON.parse(readFileSync(path, "utf8"));
  const result = validate(report);
  if (!result.ok) {
    for (const e of result.errors) console.error("✗", e);
    console.error(`\nFAIL · ${result.errors.length} error(s)`);
    process.exit(1);
  }
  console.log(`OK · ${report.coverage_dimensions.length} dimensions · schema ✓ · 3 invariants ✓`);
}
