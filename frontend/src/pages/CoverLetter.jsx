import { useState } from "react";
import api from "../services/api";

function CoverLetter() {

    const [resume, setResume] = useState(null);
    const [jd, setJd] = useState(null);

    const [loading, setLoading] = useState(false);

    const generateCoverLetter = async () => {

        if (!resume || !jd) {

            alert("Please upload both Resume and Job Description.");

            return;

        }

        const formData = new FormData();

        formData.append("resume", resume);
        formData.append("job_description", jd);

        try {

            setLoading(true);

            const response = await api.post(

                "/cover-letter/generate",

                formData,

                {
                    responseType: "blob",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }

            );

            const file = new Blob(
                [response.data],
                {
                    type: "application/pdf",
                }
            );

            const fileURL = window.URL.createObjectURL(file);

            window.open(fileURL);

        } catch (error) {

            console.error(error);

            alert("Error generating Cover Letter.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-4xl font-bold text-blue-700 mb-3">
                AI Cover Letter Generator
            </h1>

            <p className="text-gray-600 mb-8">
                Upload your Resume and Job Description to generate a professional AI-powered cover letter.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8">

                <p className="font-semibold mb-2">
                    Upload Resume
                </p>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                />

                {resume && (

                    <p className="mt-2 text-green-600">

                        <b>Selected Resume:</b> {resume.name}

                    </p>

                )}

                <br />

                <p className="font-semibold mb-2">
                    Upload Job Description
                </p>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setJd(e.target.files[0])}
                />

                {jd && (

                    <p className="mt-2 text-green-600">

                        <b>Selected JD:</b> {jd.name}

                    </p>

                )}

                <button
                    onClick={generateCoverLetter}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >

                    {loading ? "Generating..." : "Generate Cover Letter"}

                </button>

            </div>

        </div>

    );

}

export default CoverLetter;