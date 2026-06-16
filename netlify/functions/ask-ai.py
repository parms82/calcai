import json
import os


def handler(event, context):
    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "body": json.dumps({"error": "Method not allowed"})}

    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return {"statusCode": 400, "body": json.dumps({"error": "Invalid JSON"})}

    question = body.get("question", "").strip()
    calculator_type = body.get("calculator_type", "")

    if not question:
        return {"statusCode": 400, "body": json.dumps({"error": "question is required"})}

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")

    if not api_key:
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({
                "answer": (
                    "AI assistant is not configured yet. "
                    "Add ANTHROPIC_API_KEY in Netlify → Site Settings → Environment Variables."
                )
            }),
        }

    try:
        import anthropic

        client = anthropic.Anthropic(api_key=api_key)
        context_note = f" The user is using the {calculator_type} calculator." if calculator_type else ""

        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=300,
            system=(
                "You are CalcAI, an expert Indian financial advisor. "
                "Answer in 3-4 sentences using simple language. "
                "Always use ₹, Lakh, Crore format for amounts. "
                "End with one specific, actionable tip."
            ),
            messages=[{"role": "user", "content": question + context_note}],
        )

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"answer": message.content[0].text}),
        }

    except Exception as e:
        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"answer": f"Sorry, I couldn't process your question right now. Please try again."}),
        }
