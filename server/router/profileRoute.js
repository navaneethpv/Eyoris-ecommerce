// routes/profileRoute.js
const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');
const { requireAuth } = require('@clerk/express');

// sanity checks to fail fast at startup with clear message
if (!profileController || typeof profileController.getProfile !== 'function' || typeof profileController.updateProfile !== 'function') {
  throw new Error('profileController must export getProfile and updateProfile functions. Check server/controller/profileController.js');
}
if (typeof requireAuth !== 'function') {
  throw new Error('@clerk/express requireAuth is not a function. Check your @clerk/express installation and import.');
}

// Protected profile routes
router.get('/me', requireAuth(), profileController.getProfile);
router.patch('/me', requireAuth(), express.json(), profileController.updateProfile);

// Clerk webhook stub (JSON body expected)
// TODO: verify Clerk webhook signature using CLERK_WEBHOOK_SECRET before trusting payload
router.post('/clerk-webhook', express.json(), async (req, res) => {
  try {
    const event = req.body;
    if (event?.type === 'user.created') {
      const u = event.data;
      // persist to DB here (Prisma / Mongoose / your ORM)
      // e.g. await prisma.user.create({ data: { clerkId: u.id, email: u.primary_email_address?.email_address }});
      console.log('Clerk webhook user.created for', u?.id);
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('webhook error', err);
    return res.status(500).json({ ok: false });
  }
});

module.exports = router;
