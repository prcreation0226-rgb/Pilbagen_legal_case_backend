const crypto = require('crypto');

const SECRET_KEY = process.env.CHAT_ENCRYPTION_SECRET || process.env.JWT_SECRET || 'pilbagen_encrypted_chat_secret_2026';
const ALGORITHM = 'aes-256-cbc';
const KEY = crypto.scryptSync(SECRET_KEY, 'pilbagen_salt', 32);

/**
 * Encrypt message payload
 * @param {string} text 
 * @returns {string} Encrypted string prefixed with ENC:
 */
function encryptPayload(text) {
  if (!text) return '';
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `ENC:${iv.toString('hex')}:${encrypted}`;
  } catch (err) {
    console.error('Encryption error:', err.message);
    return text;
  }
}

/**
 * Decrypt message payload
 * @param {string} cipherText 
 * @returns {string} Decrypted plaintext string
 */
function decryptPayload(cipherText) {
  if (!cipherText) return '';
  if (!cipherText.startsWith('ENC:')) return cipherText;

  try {
    const parts = cipherText.split(':');
    if (parts.length !== 3) return cipherText;
    const iv = Buffer.from(parts[1], 'hex');
    const encryptedText = parts[2];
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.error('Decryption error:', err.message);
    return '[Encrypted Message]';
  }
}

module.exports = {
  encryptPayload,
  decryptPayload,
};
