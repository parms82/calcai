from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from api import ai, leads, affiliates


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="FinCalcAI API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://fincalcai.in"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai.router, prefix="/api/ai", tags=["AI"])
app.include_router(leads.router, prefix="/api/leads", tags=["Leads"])
app.include_router(affiliates.router, prefix="/api/affiliates", tags=["Affiliates"])


@app.get("/health")
def health():
    return {"status": "ok", "version": "1.0.0"}
