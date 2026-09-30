import { useEffect, type JSX } from "react";
import { useParams, Link, Navigate } from "react-router";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { getBlogPostBySlug, blogPosts } from "@/data/blogPosts";
import { geoImageObject } from "@/data/photoGeo";
import Footer from "@/react-app/components/Footer";
import SiteNav from "@/react-app/components/SiteNav";
import PostCard from "@/react-app/components/PostCard";
import { formatPostDate } from "@/react-app/lib/utils";

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
    const meta = document.querySelector("meta[name='description']") as HTMLMetaElement;
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
          <strong key={key++} className="font-semibold text-ink">
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
              className="font-medium text-chili underline decoration-chili/30 underline-offset-4 transition-colors hover:decoration-chili"
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
              className="font-medium text-chili underline decoration-chili/30 underline-offset-4 transition-colors hover:decoration-chili"
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
        <ul key={key++} className="mb-7 space-y-3 pl-1 text-cocoa-500">
          {items.map((item, i) => (
            <li key={i} className="flex gap-4 leading-relaxed">
              <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-500" />
              <span>{renderInline(item)}</span>
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
            className="my-10 w-full rounded-2xl object-cover shadow-[0_30px_60px_-30px_rgba(27,19,14,0.6)]"
          />
        );
      } else if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2 key={key++} className="mb-5 mt-14 font-display text-3xl leading-tight text-ink sm:text-4xl">
            {renderInline(line.replace("## ", ""))}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3 key={key++} className="mb-4 mt-10 font-display text-2xl text-ink">
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
          <p key={key++} className="mb-6 text-[1.075rem] leading-[1.8] text-cocoa-500">
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
    <div className="min-h-screen bg-paper">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription,
            image: [
              geoImageObject(post.image, post.imageAlt),
              ...Array.from(post.content.matchAll(/^!\[([^\]]*)\]\(([^)]+)\)$/gm))
                .filter((m) => m[2] !== post.image)
                .map((m) => geoImageObject(m[2], m[1]))
            ],
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
                url: "https://nanasans.com/images/nana-sans-logo.png"
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

      <SiteNav />

      {/* Masthead over the post's photograph */}
      <header className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink text-paper">
        <img
          src={post.image}
          alt={post.imageAlt}
          className="absolute inset-0 h-full w-full animate-slow-zoom object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div className="relative mx-auto w-full max-w-3xl px-5 pb-14 pt-36 sm:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-saffron-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to the Journal
          </Link>
          <p className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[0.2em] text-saffron-300">
            <span className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              {formatPostDate(post.date, "long")}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </p>
          <h1 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-6xl">{post.title}</h1>
        </div>
      </header>

      {/* Article Content */}
      <article className="grain px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="mb-10 border-l-2 border-saffron-500 pl-6 font-display text-2xl font-light italic leading-snug text-ink">
            {post.excerpt}
          </p>

          <div>{renderContent(post.content)}</div>

          {/* CTA */}
          <div className="relative mt-16 overflow-hidden rounded-[1.75rem] bg-ink p-8 text-paper sm:p-10">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(217,154,61,0.6), transparent 65%)" }}
            />
            <h3 className="relative font-display text-3xl font-light">
              Ready to taste <em className="italic text-saffron-400">authentic tandoori?</em>
            </h3>
            <p className="relative mt-3 text-paper/65">
              Visit Nana Sans Tandoori Kitchen in Canggu and experience the flavours we've been writing about.
            </p>
            <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/#menu" className="btn-primary">
                View Our Menu
              </Link>
              <a
                href="https://wa.me/6281234564499?text=hey%20Nana%20Sans,%20I'm%20hungry"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Book a Table
              </a>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mx-auto mt-24 max-w-5xl border-t border-ink/10 pt-16">
            <p className="eyebrow">Keep reading</p>
            <h2 className="mb-10 mt-4 font-display text-3xl font-light sm:text-4xl">More from the journal</h2>
            <div className="grid gap-10 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
