export function calculateScore(prev, current) {
  if (!prev) return { score: 50, improvement: 0 };

  const improvement = ((prev - current) / prev) * 100;

  let score = 50;
  if (improvement > 10) score = 80;
  else if (improvement > 0) score = 65;
  else if (improvement < -10) score = 30;

  return { score, improvement };
}
