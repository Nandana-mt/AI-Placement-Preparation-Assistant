from fastapi import APIRouter, UploadFile, File
from fastapi.responses import FileResponse

from app.services.pdf_service import (
    save_pdf,
    extract_text,
    create_cover_letter_pdf
)

from app.services.ai_service import generate_cover_letter

router = APIRouter()


@router.post("/generate")
async def generate_cover_letter_api(
    resume: UploadFile = File(...),
    job_description: UploadFile = File(...)
):
    try:
        # Save uploaded files
        resume_path = save_pdf(resume)
        jd_path = save_pdf(job_description)

        # Extract text
        resume_text = extract_text(resume_path)
        jd_text = extract_text(jd_path)

        # Generate cover letter using AI
        result = generate_cover_letter(
            resume_text,
            jd_text
        )

       
        pdf_path = create_cover_letter_pdf(result)

        # Return PDF
        return FileResponse(
            path=pdf_path,
            media_type="application/pdf",
            filename="Cover_Letter.pdf"
        )

    except Exception as e:
        return {
            "message": "Error generating cover letter.",
            "error": str(e)
        }