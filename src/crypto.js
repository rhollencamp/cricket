import forge from 'node-forge';

export function generateSalt() {
  return forge.util.createBuffer(forge.random.getBytesSync(128), 'raw').toHex();
}

export function createKey(password, salt) {
  const iterations = 100; // TODO
  const keySize = 32; // AES-256, TODO
  return forge.pkcs5.pbkdf2(password, forge.util.hexToBytes(salt), iterations, keySize);
}

export function encrypt(key, iv, plaintext) {
  var cipher = forge.cipher.createCipher('AES-GCM', key);
  cipher.start({iv: iv});
  cipher.update(forge.util.createBuffer(plaintext, 'utf8'));
  cipher.finish();

  return {
    mac: cipher.mode.tag.toHex(),
    ciphertext: cipher.output.toHex()
  };
}

export function decrypt(key, iv, ciphertext, mac) {
  var decipher = forge.cipher.createDecipher('AES-GCM', key);
  decipher.start({
    iv: iv,
    tag: mac
  });
  decipher.update(forge.util.createBuffer(forge.util.hexToBytes(ciphertext)));
  if (decipher.finish()) {
    var json = decipher.output.toString();
    return JSON.parse(json);
  } else {
    throw 'DECRYPT_FAILED';
  }
}

