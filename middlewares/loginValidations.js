const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;

const requiredField = (field) => ({ message: `O campo "${field}" é obrigatório` });
const invalidEmail = { message: 'O "email" deve ter o formato "email@email.com"' };
const invalidPassword = { message: 'O "password" deve ter pelo menos 6 caracteres' };

const isEmailValid = (req, res, next) => {
  const { email } = req.body;

  if (!email || email === '') return res.status(400).json(requiredField('email'));
  if (!email.match(regexEmail)) return res.status(400).json(invalidEmail);

  next();
};

const isPasswordValid = (req, res, next) => {
  const { password } = req.body;

  if (!password) return res.status(400).json(requiredField('password'));
  if (password.length < 6) return res.status(400).json(invalidPassword);

  next();
};

module.exports = { isEmailValid, isPasswordValid };

// Source regexEmail: https://www.regextester.com/100026
