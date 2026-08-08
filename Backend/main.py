from fastapi import FastAPI
from routes.url_route import router as url_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="HotShot") 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
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