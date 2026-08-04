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

  // Parse inline markdown (**bold** and [text](url) links) into React nodes.
  const renderInline = (text: string): (string | JSX.Element)[] => {
    const nodes: (string | JSX.Element)[] = [];
    const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let key = 0;

    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        nodes.push(text.slice(lastIndex, match.index));
      }
      if (match[1] !== undefined) {
        // Bold
        nodes.push(
          <strong key={key++} className="font-semibold text-stone-900">
            {match[1]}
          </strong>
        );
      } else {
        // Link
        const label = match[2];
        const href = match[3];
        if (href.startsWith("/")) {
          nodes.push(
            <Link
              key={key++}
              to={href}
              className="text-amber-700 font-medium underline underline-offset-2 hover:text-amber-600"
            >
              {label}
            </Link>
          );
        } else {
          nodes.push(
            <a
              key={key++}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 font-medium underline underline-offset-2 hover:text-amber-600"
            >
              {label}
            </a>
          );
        }
      }
      lastIndex = pattern.lastIndex;
    }
    if (lastIndex < text.length) {
      nodes.push(text.slice(lastIndex));
    }
    return nodes;
  };

  // Parse markdown-style content into React elements.
  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let listItems: string[] = [];
    let key = 0;

    const flushList = () => {
      if (listItems.length === 0) return;
      const items = listItems;
      listItems = [];
      elements.push(
        <ul key={key++} className="list-disc pl-6 mb-5 space-y-2 text-stone-700">
          {items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    };

    for (const line of lines) {
      const trimmed = line.trim();
      const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);

      if (imageMatch) {
        flushList();
        elements.push(
          <img
            key={key++}
            src={imageMatch[2]}
            alt={imageMatch[1]}
            loading="lazy"
            className="w-full rounded-xl shadow-md my-6 object-cover"
          />
        );
      } else if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={key++} className="text-2xl font-bold text-stone-900 mt-8 mb-4">
            {renderInline(line.replace("## ", ""))}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={key++} className="text-xl font-semibold text-stone-800 mt-6 mb-3">
            {renderInline(line.replace("### ", ""))}
          </h3>
        );
      } else if (trimmed.startsWith("- ")) {
        listItems.push(trimmed.slice(2));
      } else if (trimmed === "") {
        flushList();
      } else {
        flushList();
        elements.push(
          <p key={key++} className="text-stone-700 leading-relaxed mb-4">
            {renderInline(line)}
          </p>
        );
      }
    }
    flushList();

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
            dateModified: post.date,
            inLanguage: "en",
            isAccessibleForFree: true,
            ...(post.keywords ? { keywords: post.keywords } : {}),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://nanasans.com/blog/${post.slug}`
            },
            author: {
              "@type": "Organization",
              name: "Nana Sans Tandoori Kitchen",
              url: "https://nanasans.com"
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

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://nanasans.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://nanasans.com/blog" },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `https://nanasans.com/blog/${post.slug}`
              }
            ]
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
