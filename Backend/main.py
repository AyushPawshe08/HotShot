from fastapi import FastAPI
from routes.url_route import router as url_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="HotShot") 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(url_router)

@app.get("/")
def root():
    return {
        "message": "API is running"
    }