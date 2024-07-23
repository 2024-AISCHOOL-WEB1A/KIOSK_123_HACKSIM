# translate_api.py
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

# 번역 파이프라인 초기화
translator = pipeline("translation_en_to_de", model="Helsinki-NLP/opus-mt-en-de")

class TranslationRequest(BaseModel):
    text: str

@app.post("/translate/")
async def translate(request: TranslationRequest):
    translation = translator(request.text)
    return {"translation": translation[0]['translation_text']}
