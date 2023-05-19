from nltk.tokenize import word_tokenize, sent_tokenize

def text_validator(text):
  result = []

  # заглавие и его соответствие содержанию
  title_matching_words = []
  with open('data/title_matching.txt', 'r') as file:
    title_matching_words = file.read().splitlines()

  sentences_with_title_matching_word = []
  for sen in sent_tokenize(text):
      l = word_tokenize(sen)
      if len(set(l).intersection(title_matching_words))>0:
          sentences_with_title_matching_word.append(sen)
  
  result.append({
    "name": 'Заглавие и его соответствие содержанию',
    "value": len(sentences_with_title_matching_word) != 0
  })

  # актуальность
  relevance_words = []
  with open('data/relevance.txt', 'r') as file:
    relevance_words = file.read().splitlines()

  sentences_with_relevance_word = []
  for sen in sent_tokenize(text):
      l = word_tokenize(sen)
      if len(set(l).intersection(relevance_words))>0:
          sentences_with_relevance_word.append(sen)
  
  result.append({
    "name": 'Актуальность',
    "value": len(sentences_with_relevance_word) != 0
  })

  # аргументированность выводов
  argumentation_words = []
  with open('data/argumentation.txt', 'r') as file:
    argumentation_words = file.read().splitlines()

  sentences_with_argumentation_word = []
  for sen in sent_tokenize(text):
      l = word_tokenize(sen)
      if len(set(l).intersection(argumentation_words))>0:
          sentences_with_argumentation_word.append(sen)
  
  result.append({
    "name": 'Аргументированность выводов',
    "value": len(sentences_with_argumentation_word) != 0
  })

  return result