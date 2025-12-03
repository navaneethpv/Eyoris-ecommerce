const express = require('express');
const router = express.Router();

let prisma;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (err) {
  console.warn('Prisma client not available in clerkWebhook. Install @prisma/client and run prisma generate.', err?.message);
  prisma = null;
}

// TODO: verify Clerk webhook signature using CLERK_WEBHOOK_SECRET before trusting payload

router.post('/clerk-webhook', express.json(), async (req, res) => {
  try {
    const evt = req.body;
    if (!evt || !evt.type) return res.status(400).json({ ok: false, error: 'invalid payload' });

    if (evt.type === 'user.created') {
      const u = evt.data;
      if (!u || !u.id) {
        console.warn('webhook user.created missing data', evt);
      } else {
        if (!prisma) {
          console.warn('Prisma not available. Skipping DB persist for user.created', u?.id);
        } else {
          await prisma.user.upsert({
            where: { clerkId: u.id },
            create: {
              clerkId: u.id,
              email: u.primary_email_address?.email_address ?? null,
              firstName: u.first_name ?? null,
              lastName: u.last_name ?? null,
            },
            update: {
              email: u.primary_email_address?.email_address ?? null,
              firstName: u.first_name ?? null,
              lastName: u.last_name ?? null,
            },
          });
        }
      }
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error('webhook error', err);
    return res.status(500).json({ ok: false });
  }
});

module.exports = router;