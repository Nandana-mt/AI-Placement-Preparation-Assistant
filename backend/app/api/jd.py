from fastapi import APIRouter, UploadFile, File
from app.services.pdf_service import save_pdf, extract_text

router = APIRouter()

@router.post("/upload")
async def upload_jd(file: UploadFile = File(...)):
    print("JD Upload API called")

    # Save the uploaded PDF
    file_path = save_pdf(file)

    # Extract text from the PDF
    extracted_text = extract_text(file_path)

    return {
        "message": "Job Description uploaded successfully",
        "file_path": file_path,
        "job_description": extracted_text
    }