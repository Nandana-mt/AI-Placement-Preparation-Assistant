import { useState } from "react";
import api from "../services/api";

function ResumeMatch() {

    const [resume, setResume] = useState(null);
    const [jd, setJd] = useState(null);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const compareResume = async () => {

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
                "/resume/match",
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

            console.error(error);

            if (error.response) {

                console.log(error.response.data);

                alert(
                    JSON.stringify(error.response.data, null, 2)
                );

            } else {

                alert("Error comparing resume.");

            }

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-4xl font-bold text-blue-700 mb-3">
                Resume Match
            </h1>

            <p className="text-gray-600 mb-8">
                Compare your resume with the Job Description.
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
                    onClick={compareResume}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                    {loading ? "Comparing..." : "Compare Resume"}
                </button>

            </div>

            {result && (

                <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

                    <h2 className="text-2xl font-bold text-blue-700 mb-6">
                        Resume Match Report
                    </h2>

                    <p className="text-xl mb-6">
                        <b>Match Score:</b> {result.match_score}%
                    </p>

                    <div className="mb-6">

                        <h3 className="text-xl font-semibold mb-2">
                            Matching Skills
                        </h3>

                        <ul className="list-disc ml-6">

                            {result.matching_skills.map((item, index) => (

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

                    <div className="mb-6">

                        <h3 className="text-xl font-semibold mb-2">
                            Missing Keywords
                        </h3>

                        <ul className="list-disc ml-6">

                            {result.missing_keywords.map((item, index) => (

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

export default ResumeMatch;