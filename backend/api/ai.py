from fastapi import APIRouter
from pydantic import BaseModel
import os

router = APIRouter()


class AskRequest(BaseModel):
    question: str
    calculator_type: str = ""
    result_context: str = ""


@router.post("/ask")
async def ask_ai(req: AskRequest):
    api_key = os.getenv("ANTHROPIC_API_KEY", "")

    if not api_key:
        return {
            "answer": (
                "AI assistant is not configured yet. "
                "Add your ANTHROPIC_API_KEY to backend/.env to enable AI-powered answers. "
                "Visit console.anthropic.com to get your key."
            )
        }

    try:
        import anthropic
        client = anthropic.Anthropic(api_key=api_key)
        system = (
            "You are FinCalcAI, an expert Indian financial advisor. "
            "Answer in 3-4 sentences using simple language. "
            "Always use ₹, Lakh, Crore format for amounts. "
            "End with one specific, actionable tip."
        )
        context = f" The user is using the {req.calculator_type} calculator." if req.calculator_type else ""
        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=300,
            system=system,
            messages=[{"role": "user", "content": req.question + context}],
        )
        return {"answer": message.content[0].text}
    except Exception as e:
        return {"answer": f"Sorry, I couldn't process your question right now. Please try again. ({str(e)})"}
