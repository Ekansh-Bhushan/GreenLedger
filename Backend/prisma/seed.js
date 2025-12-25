const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {

  /* ---------- USER ---------- */
  const user = await prisma.user.upsert({
    where: { email: "ekansh@greenledger.com" },
    update: {},
    create: {
      name: "Ekansh Bhushan",
      email: "ekansh@greenledger.com",
      householdSize: 3,
      city: "Delhi",
    },
  });

  /* ---------- RESOURCES ---------- */
  await prisma.resource.createMany({
    data: [
      { id: 1, name: "Electricity", unit: "kWh", co2Factor: 0.82 },
      { id: 2, name: "Water", unit: "Liters", co2Factor: 0.0003 },
      { id: 3, name: "Fuel", unit: "INR", co2Factor: 0.002 },
    ],
    skipDuplicates: true,
  });

  /* ---------- BENCHMARKS ---------- */
  await prisma.benchmark.createMany({
    data: [
      { resourceId: 1, householdSize: 3, avgValue: 220, region: "India" },
      { resourceId: 2, householdSize: 3, avgValue: 9000, region: "India" },
      { resourceId: 3, householdSize: 3, avgValue: 3000, region: "India" },
    ],
    skipDuplicates: true,
  });

  /* ---------- USAGE (MONTH 1 – NORMAL) ---------- */
  await prisma.usage.create({
    data: {
      userId: user.id,
      resourceId: 1,
      month: 5,
      year: 2025,
      value: 200,
      source: "MANUAL",   // ✅ VALID ENUM
    },
  });

  await prisma.usage.create({
    data: {
      userId: user.id,
      resourceId: 2,
      month: 5,
      year: 2025,
      value: 8500,
      source: "MANUAL",   // ✅ VALID ENUM
    },
  });

  /* ---------- USAGE (MONTH 2 – INTENTIONAL VIOLATION) ---------- */
  const electricityJune = await prisma.usage.create({
    data: {
      userId: user.id,
      resourceId: 1,
      month: 6,
      year: 2025,
      value: 280,
      source: "MANUAL",   // ✅ VALID ENUM
    },
  });

  const waterJune = await prisma.usage.create({
    data: {
      userId: user.id,
      resourceId: 2,
      month: 6,
      year: 2025,
      value: 12000,
      source: "MANUAL",   // ✅ VALID ENUM
    },
  });

  /* ---------- FLAGS (EXPLICIT DEMO) ---------- */
  await prisma.wasteFlag.createMany({
    data: [
      {
        usageId: electricityJune.id,
        type: "SPIKE",
        reason: "Usage increased >15% compared to last month",
        severity: "HIGH",
      },
      {
        usageId: electricityJune.id,
        type: "INEFFICIENCY",
        reason: "Usage exceeds regional benchmark",
        severity: "MEDIUM",
      },
      {
        usageId: waterJune.id,
        type: "INEFFICIENCY",
        reason: "Usage exceeds regional benchmark",
        severity: "MEDIUM",
      },
    ],
  });

  console.log("✅ DEMO DATA SEEDED – ENUM ISSUE FIXED");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
