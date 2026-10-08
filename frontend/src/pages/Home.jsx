import FeatureCard from "../components/FeatureCard";

import {
  FaFileAlt,
  FaSearch,
  FaMicrophone,
  FaEnvelope
} from "react-icons/fa";

function Home() {
  return (
    <div>

      {/* Hero Section */}

      <div className="text-center mt-12 mb-14">

        <h1 className="text-5xl font-bold text-blue-700">
          AI Placement Preparation Assistant
        </h1>

        <p className="text-xl text-gray-600 mt-4">
          Prepare Smarter • Get Placed Faster 🚀
        </p>

      </div>

      {/* Feature Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <FeatureCard
          icon={<FaFileAlt />}
          title="Resume ATS"
          description="Analyze your resume and receive ATS score, strengths, weaknesses, and improvement suggestions."
          link="/resume-ats"
        />

        <FeatureCard
          icon={<FaSearch />}
          title="Resume Match"
          description="Compare your resume with the job description and identify missing skills."
          link="/resume-match"
        />

        <FeatureCard
          icon={<FaMicrophone />}
          title="Mock Interview"
          description="Generate interview questions and receive AI-powered feedback on your answers."
          link="/interview"
        />

        <FeatureCard
          icon={<FaEnvelope />}
          title="Cover Letter"
          description="Generate a professional cover letter tailored to the selected job description."
          link="/cover-letter"
        />

      </div>

    </div>
  );
}

export default Home;