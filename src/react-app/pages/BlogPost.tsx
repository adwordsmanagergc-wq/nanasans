import { useEffect, type JSX } from "react";
import { useParams, Link, Navigate } from "react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getBlogPostBySlug, blogPosts } from "@/data/blogPosts";
import Footer from "@/react-app/components/Footer";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) return;

    // Set canonical URL
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = `https://nanasans.com/blog/${post.slug}`;

    // Update title
    document.title = `${post.title} | Nana Sans Canggu`;

    // Update meta description
    let meta = document.querySelector("meta[name='description']") as HTMLMetaElement;
    if (meta) {
      meta.content = post.metaDescription;
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Parse markdown-style content to HTML
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let key = 0;

    for (const line of lines) {
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={key++} className="text-2xl font-bold text-stone-900 mt-8 mb-4">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={key++} className="text-xl font-semibold text-stone-800 mt-6 mb-3">
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.trim() === "") {
        // Skip empty lines
      } else {
        elements.push(
          <p key={key++} className="text-stone-700 leading-relaxed mb-4">
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  // Get related posts (exclude current)
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription,
            image: post.image,
            datePublished: post.date,
            author: {
              "@type": "Organization",
              name: "Nana Sans Tandoori Kitchen"
            },
            publisher: {
              "@type": "Organization",
              name: "Nana Sans Tandoori Kitchen",
              logo: {
                "@type": "ImageObject",
                url: "https://019d3354-8713-702b-8fee-7250ae8a6674.mochausercontent.com/nana-sans-logo.png"
              }
            }
          })
        }}
      />

      {/* Header */}
      <header className="bg-stone-900 text-white py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </header>

      {/* Hero Image */}
      <div className="w-full h-64 md:h-80 overflow-hidden">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-10 -mt-16 relative">
          <div className="flex items-center gap-4 text-sm text-stone-500 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">
            {post.title}
          </h1>

          <div className="prose prose-stone max-w-none">
            {renderContent(post.content)}
          </div>

          {/* CTA */}
          <div className="mt-10 p-6 bg-amber-50 rounded-lg border border-amber-200">
            <h3 className="text-lg font-semibold text-stone-900 mb-2">
              Ready to taste authentic tandoori?
            </h3>
            <p className="text-stone-600 mb-4">
              Visit Nana Sans Tandoori Kitchen in Canggu and experience the flavours we've been writing about.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
              >
                View Our Menu
              </Link>
              <a
                href="https://wa.me/6281234564499?text=hey%20Nana%20Sans,%20I'm%20hungry"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Book a Table
              </a>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-stone-900 mb-6">
              More from our blog
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
