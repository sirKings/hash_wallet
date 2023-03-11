//@ts-ignore
import CryptoJS from 'rn-crypto-js';

export class CryptoHelper {
  encryptKey = (privateKey: string, pin: string): string => {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(privateKey, pin).toString();

    console.log('Encrypted ', ciphertext);
    return ciphertext;
  };

  decryptKey = (cipher: string, pin: string): string => {
    // Decrypt
    var ciphertext = CryptoJS.AES.decrypt(cipher, pin).toString(
      CryptoJS.enc.Utf8,
    );

    console.log('Decrypted ', ciphertext);
    return ciphertext;
  };
}
