const bcrypt = require('bcryptjs');
const saltRounds = 10;

export function hashPassword(plainPassword) {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(plainPassword, salt);
}