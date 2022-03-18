const express = require('express');
const { readTalkers } = require('../helpers/readWriteTalkers');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkers = await readTalkers();
  if (talkers.length === 0) return res.status(200).json([]);

  return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkers();
  const talker = talkers.find((t) => t.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

module.exports = router;
