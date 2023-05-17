from dostoevsky.tokenization import RegexTokenizer
from dostoevsky.models import FastTextSocialNetworkModel

def sentiment_analyse(text):
    tokenizer = RegexTokenizer()

    model = FastTextSocialNetworkModel(tokenizer=tokenizer)

    messages = [
        text,
    ]

    results = model.predict(messages, k=2)

    print(results)

    for message, sentiment in zip(messages, results):
        print(message, '->', sentiment)

    return 'OK'
