const { parentPort } = require('worker_threads');
import * as cryptoLib from 'crypto';

const encryptData = (buffer) => {
  const algorithm = 'aes-256-ctr';
  const secretKey = 'secret-key';
  const iv = cryptoLib.randomBytes(16);

  const cipher = cryptoLib.createCipheriv(algorithm, secretKey, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

  return { iv: iv.toString('hex'), content: encrypted.toString('hex') };
};

parentPort.on('message', (data) => {
  const encrypted = encryptData(data);
  parentPort.postMessage(encrypted);
});
