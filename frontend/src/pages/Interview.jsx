import { useState } from "react";
import api from "../services/api";

function Interview() {

    const [resume, setResume] =useState(null);
    const [jd, setJd] = useState(null);

    const [loading, setLoading] = useState(false);
    const [evaluating, setEvaluating] = useState(false);

    const [questions, setQuestions] = useState({});
    const [answers, setAnswers] = useState([]);
    const [evaluation, setEvaluation] = useState(null);

    const generateQuestions = async () => {

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
                "/interview/generate",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);

            setQuestions(response.data.questions);

            const allQuestions = [
                ...response.data.questions.hr_questions,
                ...response.data.questions.technical_questions,
            ];

            setAnswers(new Array(allQuestions.length).fill(""));
            setEvaluation(null);

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(JSON.stringify(error.response.data, null, 2));
            } else {
                alert("Error generating interview questions.");
            }

        } finally {

            setLoading(false);

        }

    };

    const evaluateAnswers = async () => {

        const allQuestions = [
            ...questions.hr_questions,
            ...questions.technical_questions,
        ];

        try {

            setEvaluating(true);

            const response = await api.post(
                "/interview/evaluate",
                {
                    questions: allQuestions,
                    answers: answers,
                }
            );

            console.log(response.data);

            setEvaluation(response.data.evaluation);

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(JSON.stringify(error.response.data, null, 2));
            } else {
                alert("Evaluation failed.");
            }

        } finally {

            setEvaluating(false);

        }

    };

    return (

        <div className="max-w-5xl mx-auto p-8">

            <h1 className="text-4xl font-bold text-blue-700 mb-3">
                AI Interview Preparation
            </h1>

            <p className="text-gray-600 mb-8">
                Generate interview questions using your Resume and Job Description.
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
                    onClick={generateQuestions}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                    {loading ? "Generating..." : "Generate Questions"}
                </button>

            </div>

            {questions.hr_questions && (

                <div className="bg-white rounded-xl shadow-lg p-8 mt-8">

                    <h2 className="text-3xl font-bold text-blue-700 mb-6">
                        HR Questions
                    </h2>

                    {questions.hr_questions.map((question, index) => (

                        <div
                            key={index}
                            className="mb-6 border-b pb-4"
                        >

                            <h3 className="font-bold text-lg mb-2">
                                Question {index + 1}
                            </h3>

                            <p className="mb-3">
                                {question}
                            </p>

                            <textarea
                                className="w-full border rounded-lg p-3"
                                rows="4"
                                placeholder="Type your answer here..."
                                value={answers[index] || ""}
                                onChange={(e) => {

                                    const updatedAnswers = [...answers];
                                    updatedAnswers[index] = e.target.value;
                                    setAnswers(updatedAnswers);

                                }}
                            />

                        </div>

                    ))}

                    <h2 className="text-3xl font-bold text-blue-700 mt-10 mb-6">
                        Technical Questions
                    </h2>

                    {questions.technical_questions.map((question, index) => (

                        <div
                            key={index}
                            className="mb-6 border-b pb-4"
                        >

                            <h3 className="font-bold text-lg mb-2">
                                Question {index + 1}
                            </h3>

                            <p className="mb-3">
                                {question}
                            </p>

                            <textarea
                                className="w-full border rounded-lg p-3"
                                rows="4"
                                placeholder="Type your answer here..."
                                value={answers[questions.hr_questions.length + index] || ""}
                                onChange={(e) => {

                                    const updatedAnswers = [...answers];
                                    updatedAnswers[
                                        questions.hr_questions.length + index
                                    ] = e.target.value;

                                    setAnswers(updatedAnswers);

                                }}
                            />

                        </div>

                    ))}

                    <button
                        onClick={evaluateAnswers}
                        className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                    >
                        {evaluating ? "Evaluating..." : "Evaluate Answers"}
                    </button>

                </div>

            )}

{evaluation && (

<div className="bg-white rounded-xl shadow-lg p-8 mt-8">

    <h2 className="text-3xl font-bold text-blue-700 mb-8">
        Interview Evaluation
    </h2>

    <div className="mb-8">

        <p className="text-2xl font-semibold">
            Overall Score:
            <span className="text-green-600">
                {" "}{evaluation.overall_score}/100
            </span>
        </p>

    </div>

    <h3 className="text-2xl font-bold text-blue-700 mb-5">
        Question-wise Feedback
    </h3>

    {evaluation.question_wise_feedback.map((item, index) => (

        <div
            key={index}
            className="border rounded-xl p-5 mb-6 shadow-sm"
        >

            <h4 className="text-xl font-bold mb-3">
                Question {index + 1}
            </h4>

            <p className="mb-3">
                <span className="font-semibold">
                    Question:
                </span>
                <br />
                {item.question}
            </p>

            <p className="mb-3">
                <span className="font-semibold">
                    Score:
                </span>

                <span className="text-blue-700 font-bold">
                    {" "}{item.score}/10
                </span>
            </p>

            <p>
                <span className="font-semibold">
                    Feedback:
                </span>
                <br />
                {item.feedback}
            </p>

        </div>

    ))}

</div>

)}

        </div>

    );

}

export default Interview;