import { NavLink } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <FaRobot className="text-2xl" />
          <h1 className="text-2xl font-bold">
            AI Placement Preparation Assistant
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-8 text-lg font-medium">

          <NavLink to="/" className={navStyle}>
            Home
          </NavLink>

          <NavLink to="/resume-ats" className={navStyle}>
            Resume ATS
          </NavLink>

          <NavLink to="/resume-match" className={navStyle}>
            Resume Match
          </NavLink>

          <NavLink to="/interview" className={navStyle}>
            Interview
          </NavLink>

          <NavLink to="/cover-letter" className={navStyle}>
            Cover Letter
          </NavLink>

        </div>

      </div>
    </nav>
  );
}

const navStyle = ({ isActive }) =>
  isActive
    ? "text-yellow-300 font-semibold"
    : "hover:text-yellow-300 transition duration-300";

export default Navbar;