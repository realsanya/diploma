from nltk.tokenize import word_tokenize, sent_tokenize

def text_validator(text, settings):
  result = []

  for setting in settings:
    if setting['enable'] is True:
      sentences_with_matching_word = []
      for sen in sent_tokenize(text):
          l = word_tokenize(sen)
          if len(set(l).intersection(setting['words']))>0:
              sentences_with_matching_word.append(sen)
      
      result.append({
        "name": setting['name'],
        "value": len(sentences_with_matching_word) != 0
      })

  return result