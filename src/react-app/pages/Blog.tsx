import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import Footer from "@/react-app/components/Footer";
import PageHeader from "@/react-app/components/PageHeader";
import PostCard from "@/react-app/components/PostCard";
import { formatPostDate, imgSize } from "@/react-app/lib/utils";

export default function Blog() {

  const [featured, ...rest] = blogPosts;

  return (
    <div className="min-h-screen bg-paper">
      <PageHeader
        eyebrow="The Journal"
        title={
          <>
            Indian Food &amp; Tandoori <em className="italic text-saffron-400">Blog</em> from Nana Sans, Canggu
          </>
        }
        intro="Tandoori know-how, vegetarian favourites and dining guides from Nana Sans in Canggu, Bali."
      />

      <main className="grain mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            className="group mb-20 grid items-center gap-8 md:grid-cols-[1.2fr_1fr] md:gap-14"
          >
            <div className="aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-ink/10">
              <img
                src={featured.image}
                alt={featured.imageAlt}
                {...imgSize(featured.image)}
                className="h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-105"
                loading="eager"
              />
            </div>
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-saffron-600">
                Latest <span className="mx-2 text-ink/25">/</span> {formatPostDate(featured.date, "long")}{" "}
                <span className="mx-2 text-ink/25">/</span> {featured.readTime}
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-ink transition-colors group-hover:text-chili sm:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-5 leading-relaxed text-cocoa-500">{featured.excerpt}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                Read the story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        )}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} headingLevel="h2" />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
