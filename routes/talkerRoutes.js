const express = require('express');
const { readTalkers, writeTalkers } = require('../helpers/readWriteTalkers');
const {
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkFieldValid,
} = require('../middlewares/talkerValidations');

const router = express.Router();

router.get('/', async (req, res) => {
  const talkers = await readTalkers();
  if (talkers.length === 0) return res.status(200).json([]);

  return res.status(200).json(talkers);
});

router.get(
  '/search',
  isTokenValid,
  async (req, res) => {
    const { q } = req.query;

    const talkers = await readTalkers();
    if (!q || q === '') return res.status(200).json(talkers);

    const talker = talkers.filter((t) => t.name.includes(q));
    if (!talker) return res.status(200).json([]);

    return res.status(200).json(talker);
  },
);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkers();
  const talker = talkers.find((t) => t.id === parseInt(id, 10));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(talker);
});

router.post(
  '/',
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkFieldValid,
  async (req, res) => {
    const { name, age, talk } = req.body;

    const talkers = await readTalkers();
    const talker = { name, age, id: (talkers.length + 1), talk };

    talkers.push(talker);
    await writeTalkers(talkers);

    return res.status(201).json(talker);
  },
);

router.put(
  '/:id',
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkFieldValid,
  async (req, res) => {
    const { body: { name, age, talk }, params: { id } } = req;

    const talkers = await readTalkers();
    const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));
    
    if (talkerIndex === -1) return res.status(404).json({ message: 'Palestrante não encontrado' });

    talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };

    await writeTalkers(talkers);

    return res.status(200).json(talkers[talkerIndex]);
  },
);

router.delete(
  '/:id',
  isTokenValid,
  async (req, res) => {
    const { id } = req.params;

    const talkers = await readTalkers();
    const talkerIndex = talkers.findIndex((t) => t.id === parseInt(id, 10));
    
    if (talkerIndex === -1) return res.status(404).json({ message: 'Palestrante não encontrado' });

    talkers.splice(talkerIndex, 1);
    await writeTalkers(talkers);

    return res.status(204).end();
  },
);

module.exports = router;
