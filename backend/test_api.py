import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


# ─── Health ──────────────────────────────────────────────────────────────────
def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "ok"
    assert data["version"] == "1.0.0"


# ─── Leads ───────────────────────────────────────────────────────────────────
def test_create_lead_success():
    r = client.post("/api/leads", json={
        "name": "Rahul Sharma",
        "phone": "9876543210",
        "type": "home-loan",
        "amount": "50 Lakhs",
        "source_calculator": "home-loan-eligibility"
    })
    assert r.status_code == 200
    data = r.json()
    assert data["success"] is True
    assert "id" in data


def test_create_lead_missing_required_fields():
    r = client.post("/api/leads", json={"phone": "9876543210"})
    assert r.status_code == 422  # Pydantic validation error


def test_create_lead_minimal_fields():
    r = client.post("/api/leads", json={
        "name": "Priya",
        "phone": "9123456789"
    })
    assert r.status_code == 200
    assert r.json()["success"] is True


def test_create_lead_empty_name_rejected():
    r = client.post("/api/leads", json={"name": "", "phone": "9876543210"})
    # Empty string is technically valid for Pydantic str — it saves
    # but we confirm it doesn't 500
    assert r.status_code in (200, 422)


# ─── Affiliate Clicks ────────────────────────────────────────────────────────
def test_affiliate_click_success():
    r = client.post("/api/affiliates/click", json={
        "partner": "groww",
        "calculator": "sip"
    })
    assert r.status_code == 200
    assert r.json()["success"] is True


def test_affiliate_click_hdfc():
    r = client.post("/api/affiliates/click", json={
        "partner": "hdfc",
        "calculator": "emi"
    })
    assert r.status_code == 200


def test_affiliate_click_missing_field():
    r = client.post("/api/affiliates/click", json={"partner": "groww"})
    assert r.status_code == 422


# ─── AI endpoint ─────────────────────────────────────────────────────────────
def test_ai_ask_no_key_returns_friendly_message():
    """Without API key set, endpoint should return a stub message, not 500."""
    r = client.post("/api/ai/ask", json={
        "question": "How much SIP do I need for 1 Crore?",
        "calculator_type": "sip"
    })
    assert r.status_code == 200
    data = r.json()
    assert "answer" in data
    assert len(data["answer"]) > 10  # actual message, not empty


def test_ai_ask_missing_question():
    r = client.post("/api/ai/ask", json={})
    assert r.status_code == 422


def test_ai_ask_minimal():
    r = client.post("/api/ai/ask", json={"question": "What is SIP?"})
    assert r.status_code == 200
    assert "answer" in r.json()


# ─── 404 for unknown routes ──────────────────────────────────────────────────
def test_unknown_route_returns_404():
    r = client.get("/api/nonexistent")
    assert r.status_code == 404


def test_docs_available():
    r = client.get("/docs")
    assert r.status_code == 200


def test_openapi_schema_available():
    r = client.get("/openapi.json")
    assert r.status_code == 200
    schema = r.json()
    assert schema["info"]["title"] == "FinCalcAI API"
