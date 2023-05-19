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

  # постановка и обоснование актуальности проблемы
  relevance_words = []
  with open('data/relevance.txt', 'r') as file:
    relevance_words = file.read().splitlines()

  sentences_with_relevance_word = []
  for sen in sent_tokenize(text):
      l = word_tokenize(sen)
      if len(set(l).intersection(relevance_words))>0:
          sentences_with_relevance_word.append(sen)
  
  result.append({
    "name": 'Постановка и обоснование актуальности проблемы',
    "value": len(sentences_with_relevance_word) != 0
  })

  # оценка степени изученности проблемы
  novelty_words = []
  with open('data/novelty.txt', 'r') as file:
    novelty_words = file.read().splitlines()

  sentences_with_novelty_word = []
  for sen in sent_tokenize(text):
      l = word_tokenize(sen)
      if len(set(l).intersection(novelty_words))>0:
          sentences_with_novelty_word.append(sen)
  
  result.append({
    "name": 'Оценка степени изученности проблемы',
    "value": len(sentences_with_novelty_word) != 0
  })

  # характеристика методов
  methods_words = []
  with open('data/methods.txt', 'r') as file:
    methods_words = file.read().splitlines()

  sentences_with_methods_word = []
  for sen in sent_tokenize(text):
      l = word_tokenize(sen)
      if len(set(l).intersection(methods_words))>0:
          sentences_with_methods_word.append(sen)
  
  result.append({
    "name": 'Характеристика методов',
    "value": len(sentences_with_methods_word) != 0
  })

  # структура, логика и стиль изложения
  exposition_words = []
  with open('data/exposition.txt', 'r') as file:
    exposition_words = file.read().splitlines()

  sentences_with_exposition_word = []
  for sen in sent_tokenize(text):
      l = word_tokenize(sen)
      if len(set(l).intersection(exposition_words))>0:
          sentences_with_exposition_word.append(sen)
  
  result.append({
    "name": 'Структура, логика и стиль изложения',
    "value": len(sentences_with_exposition_word) != 0
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

  # состояние научно-справочного аппарата
  apparatus_words = []
  with open('data/apparatus.txt', 'r') as file:
    apparatus_words = file.read().splitlines()

  sentences_with_apparatus_word = []
  for sen in sent_tokenize(text):
      l = word_tokenize(sen)
      if len(set(l).intersection(apparatus_words))>0:
          sentences_with_apparatus_word.append(sen)
  
  result.append({
    "name": 'Cостояние научно-справочного аппарата',
    "value": len(sentences_with_apparatus_word) != 0
  })

  # качество и обоснованность иллюстративного материала
  illustrations_words = []
  with open('data/illustrations.txt', 'r') as file:
    illustrations_words = file.read().splitlines()

  sentences_with_illustrations_word = []
  for sen in sent_tokenize(text):
      l = word_tokenize(sen)
      if len(set(l).intersection(illustrations_words))>0:
          sentences_with_illustrations_word.append(sen)
  
  result.append({
    "name": 'Качество и обоснованность иллюстративного материала',
    "value": len(sentences_with_illustrations_word) != 0
  })

  # корректность цитирования
  citation_words = []
  with open('data/citation.txt', 'r') as file:
    citation_words = file.read().splitlines()

  sentences_with_citation_word = []
  for sen in sent_tokenize(text):
      l = word_tokenize(sen)
      if len(set(l).intersection(citation_words))>0:
          sentences_with_citation_word.append(sen)
  
  result.append({
    "name": 'Корректность цитирования',
    "value": len(sentences_with_citation_word) != 0
  })

 # общие замечания и рекомендации
  remarks_words = []
  with open('data/remarks.txt', 'r') as file:
    remarks_words = file.read().splitlines()

  sentences_with_remarks_word = []
  for sen in sent_tokenize(text):
      l = word_tokenize(sen)
      if len(set(l).intersection(remarks_words))>0:
          sentences_with_remarks_word.append(sen)
  
  result.append({
    "name": 'Общие замечания и рекомендации',
    "value": len(sentences_with_remarks_word) != 0
  })

  return result