import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ResumeATS from "./pages/ResumeATS";
import ResumeMatch from "./pages/ResumeMatch";
import Interview from "./pages/Interview";
import CoverLetter from "./pages/CoverLetter";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <main className="max-w-7xl mx-auto p-8">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume-ats" element={<ResumeATS />} />
          <Route path="/resume-match" element={<ResumeMatch />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
        </Routes>

      </main>

    </BrowserRouter>
  );
}

export default App;