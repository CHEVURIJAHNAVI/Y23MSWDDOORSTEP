const crypto = require('crypto');

// Generate a 64-byte (512-bit) secret key and convert it to a hexadecimal string
const secretKey = crypto.randomBytes(64).toString('hex');

console.log("Your secret key:", secretKey);