# import nltk
# from nltk.corpus import stopwords
# from nltk.tokenize import sent_tokenize

# nltk.download('punkt')
# nltk.download('averaged_perceptron_tagger')

# def extract_title(text):
#     # Tokenize the text into sentences
#     sentences = sent_tokenize(text)

#     # Identify named entities in the text
#     named_entities = []
#     for sentence in sentences:
#         words = nltk.word_tokenize(sentence)
#         tagged_words = nltk.pos_tag(words)
#         for word, tag in tagged_words:
#             if tag == 'NNP':
#                 named_entities.append(word)

#     # Remove stop words from the named entities
#     stop_words = set(stopwords.words('russian'))
#     named_entities = [word for word in named_entities if word.lower() not in stop_words]

#     print(named_entities)
#     # Determine the most significant named entity sequence
#     max_sequence = []
#     sequence = []
#     for word in named_entities:
#         if word in sequence:
#             sequence.append(word)
#         else:
#             if len(sequence) > len(max_sequence):
#                 max_sequence = sequence
#             sequence = [word]
#     if len(sequence) > len(max_sequence):
#         max_sequence = sequence

#     # Combine the most significant named entity sequence into a title
#     title = ' '.join(max_sequence)
#     return title

# import spacy
# nlp = spacy.load('ru_core_news_sm')

# def extract(text):
#   doc = nlp(text)
#   main_verb = None
#   for token in doc:
#       if token.pos_ == 'VERB' and (not main_verb or token.dep_ == 'ROOT'):
#           main_verb = token
#   if main_verb:
#       for sent in doc.sents:
#           if main_verb in sent:
#               title = sent.text
#               print(title)
#               break
          



# ! AFTER THIS LINE WORK FUNCTIONS ! 

from urlextract import URLExtract

def urls_extractor(text):
    extractor = URLExtract()
    urls = extractor.find_urls(text)
    
    return urls
