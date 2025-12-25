const express = require("express");
const prisma = require("../prismaClient");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { name, email, householdSize, city } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  let user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    user = await prisma.user.create({
      data: { name, email, householdSize, city }
    });
  }

  res.json(user);
});

module.exports = router;
