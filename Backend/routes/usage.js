const express = require("express");
const prisma = require("../prismaClient");
const { analyzeUsage } = require("../services/ruleEngine");

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, resourceId, month, year, value } = req.body;

  try {
    const usage = await prisma.usage.create({
      data: {
        userId,
        resourceId,
        month,
        year,
        value,
        source: "MANUAL"
      }
    });

    const previous = await prisma.usage.findFirst({
      where: {
        userId,
        resourceId,
        month: month - 1,
        year
      }
    });

    const benchmark = await prisma.benchmark.findFirst({
      where: { resourceId }
    });

    const flags = analyzeUsage(usage, previous, benchmark);

    for (const f of flags) {
      await prisma.wasteFlag.create({
        data: {
          usageId: usage.id,
          type: f.type,
          reason: f.reason,
          severity: f.severity
        }
      });
    }

    res.json({ usage, flags });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Usage processing failed" });
  }
});

module.exports = router;
