from fastapi import APIRouter, UploadFile, File
from app.services.pdf_service import save_pdf, extract_text
from app.services.ai_service import (
    analyze_resume,
    compare_resume_with_jd
)

router = APIRouter()
@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    print("Upload API called")
    file_path = save_pdf(file)
    extracted_text = extract_text(file_path)
    analysis = analyze_resume(extracted_text)

    return {
        "message": "Resume uploaded successfully",
        "file_path": file_path,
        "analysis": analysis
    }
@router.post("/match")
async def match_resume_with_jd(
    resume: UploadFile = File(...),
    job_description: UploadFile = File(...)
):
    print("Resume vs JD Match API called")

    # Save files
    resume_path = save_pdf(resume)
    jd_path = save_pdf(job_description)

    # Extract text
    resume_text = extract_text(resume_path)
    jd_text = extract_text(jd_path)

    # Compare using Groq
    analysis = compare_resume_with_jd(resume_text, jd_text)

    return {
        "message": "Resume matched with Job Description successfully",
        "analysis": analysis
    }