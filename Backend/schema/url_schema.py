from pydantic import BaseModel
from datetime import datetime

class UrlCreateSchema(BaseModel):
    original_url: str
    custom_alias: str | None = None
    expiry_hours: int | None = None

class UrlResponseSchema(BaseModel):
    short_url: str
    qr_code_path: str
    clicks: int = 0
    created_at: datetime
    expired_at: datetime | None = None
