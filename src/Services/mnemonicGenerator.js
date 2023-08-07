const wordlist = require('./wordlist.json'); // Create a wordlist.json file with 2048 unique words

const generateRandomBytes = (length) => {
  const randomBytes = new Uint8Array(length);
  window.crypto.getRandomValues(randomBytes);
  return randomBytes;
};

const generateWalletId = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  const randomBytesArray = generateRandomBytes(length);

  let walletId = '';
  for (let i = 0; i < length; i++) {
    walletId += characters[randomBytesArray[i] % charactersLength];
  }

  return walletId;
};

module.exports = {
  generateWalletId,
};
