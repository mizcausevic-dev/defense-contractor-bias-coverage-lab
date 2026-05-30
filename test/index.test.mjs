import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DIMENSION_IDS, summarize } from "../src/index.mjs";
import { validate } from "../src/validate.mjs";

const report = JSON.parse(readFileSync(new URL("../examples/stratos-bias-coverage-2026q4.json", import.meta.url), "utf8"));

test("15 dimension ids enumerated", () => assert.equal(DIMENSION_IDS.length, 15));
test("example validates", () => {
  const r = validate(report);
  assert.ok(r.ok, JSON.stringify(r.errors, null, 2));
});
test("summarize counts", () => {
  const s = summarize(report);
  assert.equal(s.report_id, "STRATOS-BIAS-2026Q4");
  assert.equal(s.decision_domain, "security-clearance-access-decision");
  assert.ok(s.dimension_count >= 8);
});
test("invariant#1: veteran dimension without VEVRAA basis fails", () => {
  const bad = JSON.parse(JSON.stringify(report));
  bad.coverage_dimensions[0].regulatory_basis = ["ofccp-41-cfr-60"];
  const r = validate(bad);
  assert.ok(!r.ok);
  assert.ok(r.errors.some((e) => e.includes("invariant#1")));
});
test("invariant#2: clearance dimension without EO 12968 + 32 CFR 147 fails", () => {
  const bad = JSON.parse(JSON.stringify(report));
  const idx = bad.coverage_dimensions.findIndex((d) => d.dimension_id === "security-clearance-tier-distribution");
  bad.coverage_dimensions[idx].regulatory_basis = ["title-vii-civil-rights-act"];
  const r = validate(bad);
  assert.ok(!r.ok);
  assert.ok(r.errors.some((e) => e.includes("invariant#2")));
});
test("invariant#3: AIR metric without comparator/reference fails", () => {
  const bad = JSON.parse(JSON.stringify(report));
  const idx = bad.coverage_dimensions.findIndex((d) => d.metric_kind === "adverse-impact-ratio");
  bad.coverage_dimensions[idx].measurement = { value: 0.9 };
  const r = validate(bad);
  assert.ok(!r.ok);
  assert.ok(r.errors.some((e) => e.includes("invariant#3")));
});
