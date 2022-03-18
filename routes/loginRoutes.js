const express = require('express');
const { isEmailValid, isPasswordValid } = require('../middlewares/loginValidations');
const generateRandomToken = require('../helpers/generateRandomToken');

const router = express.Router();

router.post(
  '/',
  isEmailValid,
  isPasswordValid,
  (_req, res) => res.status(200).json({ token: generateRandomToken() }),
);

module.exports = router;
