import { Link } from "react-router";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export default function BlogHighlights() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section
      id="blog"
      className="bg-stone-100 py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-amber-600/10 rounded-full border border-amber-600/20 mb-4">
            <span className="text-amber-700 text-sm tracking-widest uppercase font-light">
              From the Blog
            </span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
            Indian Food &amp; Tandoori Stories from Canggu
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto">
            Guides, recipes and tips from Nana Sans — your air-conditioned Indian
            restaurant in the heart of Canggu, Bali.
          </p>
        </div>

        {/* Posts grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group flex flex-col"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-stone-900 group-hover:text-amber-700 transition-colors mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-stone-600 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors"
          >
            Read the Blog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
