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

    partner = body.get("partner", "")
    calculator = body.get("calculator", "")

    if not partner:
        return {"statusCode": 422, "body": json.dumps({"error": "partner is required"})}

    supabase_url = os.environ.get("SUPABASE_URL", "")
    supabase_key = os.environ.get("SUPABASE_ANON_KEY", "")

    if supabase_url and supabase_key:
        try:
            import urllib.request

            payload = json.dumps({
                "partner": partner,
                "calculator": calculator,
                "created_at": datetime.utcnow().isoformat(),
            }).encode()

            req = urllib.request.Request(
                f"{supabase_url}/rest/v1/affiliate_clicks",
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
            pass

    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps({"success": True}),
    }
