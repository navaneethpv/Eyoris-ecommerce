const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// TODO: verify with CLERK_WEBHOOK_SECRET

router.post('/clerk-webhook', express.json(), async (req, res) => {
  const evt = req.body;
  try {
    if (evt.type === 'user.created') {
      const u = evt.data;
      await prisma.user.create({
        data: {
          clerkId: u.id,
          email: u.primary_email_address?.email_address ?? null,
          firstName: u.first_name ?? null,
          lastName: u.last_name ?? null,
        },
      });
    }
    const token = await getToken();
    await fetch('http://localhost:4000/api/profile/me', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ firstName, lastName, email, phone }),
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('webhook error', err);
    res.status(500).json({ ok: false });
  }
});

module.exports = router;