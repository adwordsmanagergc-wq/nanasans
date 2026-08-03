import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import Footer from "@/react-app/components/Footer";

export default function Blog() {
  useEffect(() => {
    // Set canonical URL
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = "https://nanasans.com/blog";

    // Update title
    document.title = "Blog – Indian Food & Tandoori Cooking Tips | Nana Sans Canggu";

    // Update meta description
    let meta = document.querySelector("meta[name='description']") as HTMLMetaElement;
    if (meta) {
      meta.content = "Explore articles about tandoori cooking, vegetarian Indian cuisine, and food pairing tips from Nana Sans Tandoori Kitchen in Canggu, Bali.";
    }
  }, []);

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Header */}
      <header className="bg-stone-900 text-white py-6 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">
            Nana Sans Blog
          </h1>
          <p className="text-stone-400 mt-2">
            Stories, recipes, and insights from our kitchen in Canggu
          </p>
        </div>
      </header>

      {/* Blog Posts Grid */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-stone-900 group-hover:text-amber-700 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-stone-600 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
