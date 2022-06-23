const { Router } = require('express');
const UserService = require('../services/UserService');
const router = Router();

router.post('/sessions', async (req, res, next) => {
  try {
    const signInToken = await UserService.signIn(req.body);
    res
      .cookie(process.env.COOKIE_NAME, signInToken, {
        httpOnly: true,
        maxAge: 86400000,
      })
      .json({ message: 'success' });
  } catch (e) {
    next(e);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    res.send(user);
  } catch (e) {
    next(e);
  }
});
router.delete('/sessions', (req, res) => {
  res
    .clearCookie(process.env.COOKIE_NAME)
    .json({ message: 'signed out succesfully' });
});

module.exports = router;
