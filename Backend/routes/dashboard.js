const express = require("express");
const prisma = require("../prismaClient");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  const userId = Number(req.params.userId);

  const usages = await prisma.usage.findMany({
    where: { userId },
    include: { resource: true, flags: true }
  });

  let totalCO2 = 0;
  let flags = [];

  usages.forEach(u => {
    if (u.resource.co2Factor) {
      totalCO2 += u.value * u.resource.co2Factor;
    }
    flags.push(...u.flags);
  });

  res.json({
    totalRecords: usages.length,
    estimatedCO2Impact: totalCO2.toFixed(2),
    flags,
    usages
  });
});

module.exports = router;
