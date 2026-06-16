import json
import os
from datetime import datetime


def handler(event, context):
    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "body": json.dumps({"error": "Method not allowed"})}

    try:
        body = json.loads(event.get("body") or "{}")
    except json.JSONDecodeError:
        return {"statusCode": 400, "body": json.dumps({"error": "Invalid JSON"})}

    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()

    if not name or not phone:
        return {"statusCode": 422, "body": json.dumps({"error": "name and phone are required"})}

    # Send email notification via Netlify's built-in email or just log
    # For now, store in environment-configured endpoint or just acknowledge
    # When you add a database (Supabase), connect it here via SUPABASE_URL + SUPABASE_KEY env vars

    supabase_url = os.environ.get("SUPABASE_URL", "")
    supabase_key = os.environ.get("SUPABASE_ANON_KEY", "")

    if supabase_url and supabase_key:
        try:
            import urllib.request

            payload = json.dumps({
                "name": name,
                "phone": phone,
                "type": body.get("type", ""),
                "amount": body.get("amount", ""),
                "source_calculator": body.get("source_calculator", ""),
                "status": "New",
                "created_at": datetime.utcnow().isoformat(),
            }).encode()

            req = urllib.request.Request(
                f"{supabase_url}/rest/v1/leads",
                data=payload,
                headers={
                    "Content-Type": "application/json",
                    "apikey": supabase_key,
                    "Authorization": f"Bearer {supabase_key}",
                    "Prefer": "return=minimal",
                },
                method="POST",
            )
            urllib.request.urlopen(req)
        except Exception:
            pass  # Don't fail if DB is unreachable

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"success": True}),
    }
