import requests

def get_answer(question):
  url = "https://api.writesonic.com/v2/business/content/chatsonic?engine=premium"

  headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "X-API-KEY": "c0bf3726-1cd4-4774-a152-2894a85917ba"
  }

  payload = {
    "enable_google_results": "true",
    "enable_memory": False,
    "input_text": question,
  }
  response = requests.post(url, json=payload, headers=headers)
  return response.text

