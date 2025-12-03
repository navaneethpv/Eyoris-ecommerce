// controllers/profileController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  getProfile: async (req, res) => {
    try {
      const clerkId = req.auth?.userId;
      if (!clerkId) return res.status(401).json({ error: 'Unauthorized' });
      const user = await prisma.user.findUnique({ where: { clerkId } });
      res.json({ ok: true, user });
    } catch (err) {
      console.error('getProfile error', err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const clerkId = req.auth?.userId;
      if (!clerkId) return res.status(401).json({ error: 'Unauthorized' });

      const { firstName, lastName, email, phone } = req.body;
      const user = await prisma.user.upsert({
        where: { clerkId },
        create: { clerkId, firstName, lastName, email, phone },
        update: { firstName, lastName, email, phone },
      });

      res.json({ ok: true, user });
    } catch (err) {
      console.error('updateProfile error', err);
      res.status(500).json({ error: 'Server error' });
    }
  },
};
