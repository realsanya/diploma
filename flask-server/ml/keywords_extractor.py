from keybert import KeyBERT

def keywords_extractor(doc):
  keywords = []
  kw_model = KeyBERT()
  keywords_weights = kw_model.extract_keywords(doc, keyphrase_ngram_range=(1, 1), top_n=100)

  for word_weight in keywords_weights:
    keywords.append(word_weight[0])

  return keywords