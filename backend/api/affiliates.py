from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import get_db, AffiliateClick

router = APIRouter()


class ClickEvent(BaseModel):
    partner: str
    calculator: str


@router.post("/click")
def record_click(body: ClickEvent, db: Session = Depends(get_db)):
    click = AffiliateClick(partner=body.partner, calculator=body.calculator)
    db.add(click)
    db.commit()
    return {"success": True}
