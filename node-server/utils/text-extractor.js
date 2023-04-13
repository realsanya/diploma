import textract from 'textract';
import { logger } from '../logger/index.js';

let textExtractor = async (file) => {
   try { 
    const type = file.mimetype;
    const buffer = (new Buffer.from(file.data, 'base64'));

    return new Promise((resolve, reject) => {
      textract.fromBufferWithMime(type, buffer, { preserveLineBreaks: true }, (err, documentText) => { 
        if (err) {
          logger.error(err);
          reject(err);
          return;
        }
        resolve(documentText);
      });
    });
  } catch(err) {
    logger.error(err);
  }
};

export {
  textExtractor,
};