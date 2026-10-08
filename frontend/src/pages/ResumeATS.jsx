import { useState } from "react";
import api from "../services/api";

function ResumeATS() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const analyzeResume = async () => {

        if (!file) {
            alert("Please select a PDF.");
            return;
        }

        const formData = new FormData();

        // Change this only if your backend expects another name
        formData.append("file", file);

        try {

            setLoading(true);

            const response = await api.post(
                "/resume/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Backend Response:", response.data);

            setResult(response.data.analysis);

        } catch (error) {

            console.error("Full Error:", error);

            if (error.response) {

                console.log("Status:", error.response.status);
                console.log("Response Data:", error.response.data);

                alert(
                    "Backend Error:\n\n" +
                    JSON.stringify(error.response.data, null, 2)
                );

            } else if (error.request) {

                console.log("No response received:", error.request);

                alert(
                    "No response received from backend.\n\n" +
                    "Is the FastAPI server running?"
                );

            } else {

                console.log("Error:", error.message);

                alert(error.message);

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-4xl font-bold text-blue-700 mb-3">
                Resume ATS Analysis
            </h1>

            <p className="text-gray-600 mb-8">
                Upload your resume and receive AI-powered ATS analysis.
            </p>

            <div className="bg-white rounded-xl shadow-lg p-8">

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                {file && (

                    <p className="mt-4 text-green-600">
                        <b>Selected File:</b> {file.name}
                    </p>

                )}

                <button
                    onClick={analyzeResume}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                    {loading ? "Analyzing..." : "Analyze Resume"}
                </button>

            </div>

            {result && (

                <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

                    <h2 className="text-2xl font-bold text-blue-700 mb-6">
                        ATS Report
                    </h2>

                    <p className="text-xl mb-6">
                        <b>ATS Score:</b> {result.ats_score}%
                    </p>

                    <div className="mb-6">

                        <h3 className="text-xl font-semibold mb-2">
                            Strengths
                        </h3>

                        <ul className="list-disc ml-6">

                            {result.strengths.map((item, index) => (

                                <li key={index}>{item}</li>

                            ))}

                        </ul>

                    </div>

                    <div className="mb-6">

                        <h3 className="text-xl font-semibold mb-2">
                            Weaknesses
                        </h3>

                        <ul className="list-disc ml-6">

                            {result.weaknesses.map((item, index) => (

                                <li key={index}>{item}</li>

                            ))}

                        </ul>

                    </div>

                    <div className="mb-6">

                        <h3 className="text-xl font-semibold mb-2">
                            Missing Skills
                        </h3>

                        <ul className="list-disc ml-6">

                            {result.missing_skills.map((item, index) => (

                                <li key={index}>{item}</li>

                            ))}

                        </ul>

                    </div>

                    <div>

                        <h3 className="text-xl font-semibold mb-2">
                            Suggestions
                        </h3>

                        <ul className="list-disc ml-6">

                            {result.suggestions.map((item, index) => (

                                <li key={index}>{item}</li>

                            ))}

                        </ul>

                    </div>

                </div>

            )}

        </div>

    );
}

export default ResumeATS;