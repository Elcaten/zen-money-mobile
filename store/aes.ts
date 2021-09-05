import aesjs from 'aes-js';
import * as Random from 'expo-random';

export const encrypt = async (text: string) => {
  const encryptionKey = await Random.getRandomBytesAsync(32);
  const textBytes = aesjs.utils.utf8.toBytes(text);
  const aesCtr = new aesjs.ModeOfOperation.ctr(encryptionKey);
  const encryptedBytes = aesCtr.encrypt(textBytes);

  return {
    encryptionKeyHex: aesjs.utils.hex.fromBytes(encryptionKey),
    encryptedTextHex: aesjs.utils.hex.fromBytes(encryptedBytes),
  };
};

export const decrypt = (encryptedTextHex: string, encryptionKeyHex: string) => {
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedTextHex);
  const encryptionKey = aesjs.utils.hex.toBytes(encryptionKeyHex);

  const aesCtr = new aesjs.ModeOfOperation.ctr(encryptionKey);
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

  return decryptedText;
};
