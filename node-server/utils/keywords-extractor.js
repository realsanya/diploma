import rake from 'node-rake';
import stopwords from 'nltk-stopwords';

const russian_stopwords = stopwords.load('russian');

const keywordsExtractor = (text) => {
  console.log(Array.from(russian_stopwords));
  const opts = { stopwords: Array.from(russian_stopwords) };
  
  //не ест русский -> заменить на child process 
  const keywords = rake.generate('this is good news', opts);

  console.log(keywords);

  return keywords;
};

export {
  keywordsExtractor,
}

