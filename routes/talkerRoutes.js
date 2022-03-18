const express = require('express');
const { readTalkers } = require('../helpers/readWriteTalkers');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkers = await readTalkers();
  if (talkers.length === 0) return res.status(200).json([]);

  return res.status(200).json(talkers);
});

module.exports = router;
