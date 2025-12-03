// controllers/profileController.js
let prisma;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (err) {
  console.warn('Prisma client not available in profileController. Install @prisma/client and run prisma generate.', err?.message);
  prisma = null;
}

// NOTE: Do NOT use React/Clerk hooks on the server (useAuth / getToken are client hooks).
// The Clerk Express middleware (requireAuth) populates req.auth.userId for protected routes.

module.exports = {
  getProfile: async (req, res) => {
    if (!prisma) {
      return res.status(500).json({ ok: false, error: 'Server misconfigured: missing @prisma/client. Install and generate Prisma client.' });
    }

    try {
      const clerkId = req.auth?.userId;
      if (!clerkId) return res.status(401).json({ error: 'Unauthorized' });

      const user = await prisma.user.findUnique({ where: { clerkId } });
      return res.json({ ok: true, user });
    } catch (err) {
      console.error('getProfile error', err);
      return res.status(500).json({ ok: false, error: 'Server error' });
    }
  },

  updateProfile: async (req, res) => {
    if (!prisma) {
      return res.status(500).json({ ok: false, error: 'Server misconfigured: missing @prisma/client. Install and generate Prisma client.' });
    }

    try {
      const clerkId = req.auth?.userId;
      if (!clerkId) return res.status(401).json({ error: 'Unauthorized' });

      const { firstName, lastName, email, phone, address } = req.body || {};

      const user = await prisma.user.upsert({
        where: { clerkId },
        create: {
          clerkId,
          firstName: firstName ?? null,
          lastName: lastName ?? null,
          email: email ?? null,
          phone: phone ?? null,
          address: address ?? null,
        },
        update: {
          firstName: firstName ?? undefined,
          lastName: lastName ?? undefined,
          email: email ?? undefined,
          phone: phone ?? undefined,
          address: address ?? undefined,
        },
      });

      return res.json({ ok: true, user });
    } catch (err) {
      console.error('updateProfile error', err);
      return res.status(500).json({ ok: false, error: 'Server error' });
    }
  },
};
