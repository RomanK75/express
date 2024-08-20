// keyGenerator.js
function generateKey() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const keyLength = 16;
  let key = '';
  for (let i = 0; i < keyLength; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
}

export default generateKey;
