from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import get_db, Lead

router = APIRouter()


class LeadCreate(BaseModel):
    name: str
    phone: str
    type: str = ""
    amount: str = ""
    source_calculator: str = ""


@router.post("")
def create_lead(body: LeadCreate, db: Session = Depends(get_db)):
    lead = Lead(
        name=body.name,
        phone=body.phone,
        type=body.type,
        amount=body.amount,
        source_calculator=body.source_calculator,
    )
    db.add(lead)
    db.commit()
    return {"success": True, "id": lead.id}
