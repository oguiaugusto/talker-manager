const getErrorObj = (message) => ({ message });
const validDateRegex = /^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$/g;

const notFoundToken = getErrorObj('Token não encontrado');
const invalidToken = getErrorObj('Token inválido');

const requiredField = (field) => getErrorObj(`O campo "${field}" é obrigatório`);
const invalidName = getErrorObj('O "name" deve ter pelo menos 3 caracteres');
const invalidAge = getErrorObj('A pessoa palestrante deve ser maior de idade');

const invalidWatchedAt = getErrorObj('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
const invalidRate = getErrorObj('O campo "rate" deve ser um inteiro de 1 à 5');
const invalidTalk = getErrorObj(
  'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
);

const isTokenValid = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json(notFoundToken);
  if (authorization.length !== 16) return res.status(401).json(invalidToken);

  next();
};

const isNameValid = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') return res.status(400).json(requiredField('name'));
  if (name.length < 3) return res.status(400).json(invalidName);

  next();
};

const isAgeValid = (req, res, next) => {
  const { age } = req.body;
  
  if (!age || age === '') return res.status(400).json(requiredField('age'));
  if (age < 18) return res.status(400).json(invalidAge);

  next();
};

const getTalkConditions = (talk) => (
  !talk || !talk.watchedAt || !talk.rate || talk.watchedAt === '' || talk.rate === ''
);
const getRateConditions = (rate) => !Number.isInteger(rate) || rate < 1 || rate > 5;

const isTalkFieldValid = (req, res, next) => {
  const { talk } = req.body;
  
  if (getTalkConditions(talk)) return res.status(400).json(invalidTalk);
  
  if (!talk.watchedAt.match(validDateRegex)) return res.status(400).json(invalidWatchedAt);
  if (getRateConditions(talk.rate)) return res.status(400).json(invalidRate);

  next();
};

module.exports = {
  isTokenValid,
  isNameValid,
  isAgeValid,
  isTalkFieldValid,
};

// Source validDateRegex: https://www.codegrepper.com/code-examples/javascript/javascript+validate+date+dd%2Fmm%2Fyyyy
