const { Router } = require('express');
const Secret = require('../models/Secret');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const secrets = await Secret.getAll();
    res.json(secrets);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
