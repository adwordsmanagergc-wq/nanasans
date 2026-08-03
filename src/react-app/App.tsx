import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import PrivacyPolicy from "@/react-app/pages/PrivacyPolicy";
import Blog from "@/react-app/pages/Blog";
import BlogPost from "@/react-app/pages/BlogPost";
import FAQ from "@/react-app/pages/FAQ";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </Router>
  );
}
