import os
import shutil
import fitz
from fastapi import UploadFile

from datetime import datetime
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)
from reportlab.lib.styles import getSampleStyleSheet


# -------------------------------------------------------
# Save Uploaded PDF
# -------------------------------------------------------

def save_pdf(file: UploadFile):

    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)

    file_path = os.path.join(upload_folder, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_path


# -------------------------------------------------------
# Extract Text from PDF
# -------------------------------------------------------

def extract_text(file_path: str):

    document = fitz.open(file_path)

    text = ""

    for page in document:
        text += page.get_text()

    document.close()

    return text


# -------------------------------------------------------
# Create Cover Letter PDF
# -------------------------------------------------------

def create_cover_letter_pdf(data):

    output_folder = "generated"
    os.makedirs(output_folder, exist_ok=True)

    pdf_path = os.path.join(
        output_folder,
        "Cover_Letter.pdf"
    )

    doc = SimpleDocTemplate(
        pdf_path,
        rightMargin=50,
        leftMargin=50,
        topMargin=50,
        bottomMargin=50
    )

    styles = getSampleStyleSheet()

    story = []

    # Title

    story.append(
        Paragraph(
            "<font size='20'><b>COVER LETTER</b></font>",
            styles["Title"]
        )
    )

    story.append(Spacer(1,25))

    # Candidate Details

    story.append(
        Paragraph(
            f"<b>{data.get('candidate_name','')}</b>",
            styles["Heading2"]
        )
    )

    if data.get("email"):
        story.append(
            Paragraph(
                data["email"],
                styles["Normal"]
            )
        )

    if data.get("phone"):
        story.append(
            Paragraph(
                data["phone"],
                styles["Normal"]
            )
        )

    if data.get("linkedin"):
        story.append(
            Paragraph(
                data["linkedin"],
                styles["Normal"]
            )
        )

    story.append(Spacer(1,20))

    # Date

    story.append(
        Paragraph(
            datetime.today().strftime("%d %B %Y"),
            styles["Normal"]
        )
    )

    story.append(Spacer(1,20))

    # Company

    if data.get("company_name"):

        story.append(
            Paragraph(
                f"<b>{data['company_name']}</b>",
                styles["Normal"]
            )
        )

        story.append(Spacer(1,15))

    # Subject

    story.append(
        Paragraph(
            f"<b>Subject: {data.get('subject','')}</b>",
            styles["Normal"]
        )
    )

    story.append(Spacer(1,20))

    # Salutation

    story.append(
        Paragraph(
            "<b>Respected Sir/Madam,</b>",
            styles["Normal"]
        )
    )

    story.append(Spacer(1,15))

    # Body

    story.append(
        Paragraph(
            data.get("introduction",""),
            styles["Normal"]
        )
    )

    story.append(Spacer(1,10))

    story.append(
        Paragraph(
            data.get("body",""),
            styles["Normal"]
        )
    )

    story.append(Spacer(1,10))

    story.append(
        Paragraph(
            data.get("closing_paragraph",""),
            styles["Normal"]
        )
    )

    story.append(Spacer(1,20))

    story.append(
        Paragraph(
            data.get("closing","Yours sincerely,"),
            styles["Normal"]
        )
    )

    story.append(Spacer(1,35))

    story.append(
        Paragraph(
            f"<b>{data.get('candidate_name','')}</b>",
            styles["Normal"]
        )
    )

    doc.build(story)

    return pdf_path