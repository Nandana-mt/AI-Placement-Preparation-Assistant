from fastapi import APIRouter, UploadFile, File
from app.services.pdf_service import save_pdf, extract_text
from pydantic import BaseModel
from app.services.ai_service import (
    generate_interview_questions,
    evaluate_interview
)
class InterviewEvaluationRequest(BaseModel):
    questions: list[str]
    answers: list[str]
router = APIRouter()

@router.post("/generate")
async def generate_questions(
    resume: UploadFile = File(...),
    job_description: UploadFile = File(...)
):
    print("Interview Question Generation API called")

    # Save files
    resume_path = save_pdf(resume)
    jd_path = save_pdf(job_description)

    # Extract text
    resume_text = extract_text(resume_path)
    jd_text = extract_text(jd_path)

    # Generate interview questions
    questions = generate_interview_questions(resume_text, jd_text)

    return {
        "message": "Interview questions generated successfully",
        "questions": questions
    }
@router.post("/evaluate")
async def evaluate_answers(request: InterviewEvaluationRequest):
    try:
        if len(request.questions) != len(request.answers):
            return {
                "message": "The number of questions and answers must be the same."
            }

        result = evaluate_interview(
            request.questions,
            request.answers
        )

        return {
            "message": "Interview evaluated successfully.",
            "evaluation": result
        }

    except Exception as e:
        return {
            "message": "Error evaluating interview.",
            "error": str(e)
        }