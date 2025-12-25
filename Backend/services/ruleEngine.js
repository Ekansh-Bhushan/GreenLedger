function analyzeUsage(current, previous, benchmark) {
  const flags = [];

  if (!previous || !benchmark) return flags;

  if (current.value > benchmark.avgValue * 1.3) {
    flags.push({
      type: "OVERUSE",
      reason: "Usage significantly above benchmark",
      severity: "HIGH"
    });
  }

  if (previous && current.value > previous.value * 1.25) {
    flags.push({
      type: "SPIKE",
      reason: "Sudden month-over-month spike",
      severity: "MEDIUM"
    });
  }

  return flags;
}

module.exports = { analyzeUsage };
