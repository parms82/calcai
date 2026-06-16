from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Text
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime, UTC
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./fincalcai.db")

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class Lead(Base):
    __tablename__ = "leads"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    type = Column(String)
    amount = Column(String)
    source_calculator = Column(String)
    status = Column(String, default="New")
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))


class AffiliateClick(Base):
    __tablename__ = "affiliate_clicks"
    id = Column(Integer, primary_key=True, index=True)
    partner = Column(String, nullable=False)
    calculator = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(UTC))


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    Base.metadata.create_all(bind=engine)
