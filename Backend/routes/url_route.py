from utils.shortcode import generate_short_code
from utils.qr_generator import generate_qr_code
from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
from schema.url_schema import UrlResponseSchema, UrlCreateSchema
from datetime import datetime, timedelta

router = APIRouter(tags=["Shorten_URL"])

# In-memory storage for shortened URLs
url_db = {}

@router.post("/url", response_model=UrlResponseSchema)
def shortenUrl(payload: UrlCreateSchema = None):
    if not payload or not payload.original_url:
        raise HTTPException(status_code=400, detail="original_url is required")

    shortcode = (payload.custom_alias.strip() if payload and payload.custom_alias else None) or generate_short_code()
    
    # Check if custom alias is already taken
    if payload and payload.custom_alias and payload.custom_alias.strip() in url_db:
        existing = url_db[payload.custom_alias.strip()]
        if not existing.get("expired_at") or datetime.now() < existing["expired_at"]:
            raise HTTPException(status_code=400, detail="Custom alias already in use")

    shorturl = f"http://localhost:8000/{shortcode}"
    qr_path = generate_qr_code(shorturl)

    created_at = datetime.now()
    expired_at = None
    if payload and payload.expiry_hours:
        expired_at = created_at + timedelta(hours=payload.expiry_hours)

    url_db[shortcode] = {
        "original_url": payload.original_url.strip(),
        "created_at": created_at,
        "expired_at": expired_at,
        "clicks": 0,
    }

    return UrlResponseSchema(
        short_url=shorturl,
        qr_code_path=qr_path,
        clicks=0,
        created_at=created_at,
        expired_at=expired_at
    )

@router.get("/url/stats/{shortcode}")
def get_url_stats(shortcode: str):
    if shortcode not in url_db:
        raise HTTPException(status_code=404, detail="Short URL not found")
    entry = url_db[shortcode]
    return {
        "shortcode": shortcode,
        "clicks": entry.get("clicks", 0),
        "created_at": entry.get("created_at"),
        "expired_at": entry.get("expired_at")
    }

@router.get("/{shortcode}")
def redirect_to_url(shortcode: str):
    if shortcode not in url_db:
        raise HTTPException(status_code=404, detail="Short URL not found")

    entry = url_db[shortcode]

    # Check expiry
    if entry.get("expired_at") and datetime.now() > entry["expired_at"]:
        raise HTTPException(status_code=410, detail="Short URL has expired")

    entry["clicks"] += 1

    target_url = entry["original_url"]
    if not target_url.startswith("http://") and not target_url.startswith("https://"):
        target_url = f"http://{target_url}"

    return RedirectResponse(url=target_url, status_code=307)
