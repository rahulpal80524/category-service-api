const crypto = require('crypto');

const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

const JWT_SECRET = generateRandomString(32); // Generates a random string of 32 bytes (256 bits)
console.log(JWT_SECRET);
