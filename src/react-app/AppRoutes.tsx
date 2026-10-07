import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import HomePage from "@/react-app/pages/Home";
import MenuPage from "@/react-app/pages/MenuPage";
import PrivacyPolicy from "@/react-app/pages/PrivacyPolicy";
import Blog from "@/react-app/pages/Blog";
import BlogPost from "@/react-app/pages/BlogPost";
import FAQ from "@/react-app/pages/FAQ";
import NotFound from "@/react-app/pages/NotFound";
import { applySeo, getSeo } from "@/seo/pages";

/** Keeps title, description, canonical and social tags in sync on client-side navigation. */
function SeoManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    applySeo(getSeo(pathname));
  }, [pathname]);
  return null;
}

/** Route tree shared by the browser (BrowserRouter) and the prerender (StaticRouter). */
export default function AppRoutes() {
  return (
    <>
      <SeoManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
