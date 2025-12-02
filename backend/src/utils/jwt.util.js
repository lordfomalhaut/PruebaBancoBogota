const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXP } = require('../config');

function sign(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXP });
}

function verify(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { sign, verify };
