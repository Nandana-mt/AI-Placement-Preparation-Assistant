import { Link } from "react-router-dom";

function FeatureCard({ icon, title, description, link }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:-translate-y-1 transition duration-300">

      <div className="text-5xl mb-4">
        {icon}
      </div>

      <h2 className="text-2xl font-bold text-blue-700 mb-3">
        {title}
      </h2>

      <p className="text-gray-600 mb-6">
        {description}
      </p>

      <Link
        to={link}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Start
      </Link>

    </div>
  );
}

export default FeatureCard;