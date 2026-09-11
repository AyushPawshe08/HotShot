from fastapi import FastAPI
from routes.url_route import router as url_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

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

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)