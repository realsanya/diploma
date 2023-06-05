import json
import random

def text_generate(form):
  text = ''

  f = open('/Users/realsanya/VSProjects/diploma/flask-server/utils/data.json')

  data = json.load(f)

  for key in form:
    variants = data[key][form[key]]

    if len(variants) != 0:
      text += random.choice(variants)

  text += 'Авторы оптимально представили полученные результаты и установили свою точку зрения ... '

  print(text)
  return text