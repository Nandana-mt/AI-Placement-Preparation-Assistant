from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.resume import router as resume_router
from app.api.jd import router as jd_router
from app.api.interview import router as interview_router
from app.api.cover_letter import router as cover_letter_router

app = FastAPI(
    title="AI Placement Preparation Assistant",
    description="AI-powered Resume Analysis and Interview Preparation System",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(resume_router, prefix="/resume", tags=["Resume"])
app.include_router(jd_router, prefix="/jd", tags=["Job Description"])
app.include_router(interview_router, prefix="/interview", tags=["Interview"])
app.include_router(
    cover_letter_router,
    prefix="/cover-letter",
    tags=["Cover Letter"]
)



@app.get("/")
def home():
    return {
        "message": "Welcome to AI Placement Preparation Assistant 🚀"
    }