import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import Reveal from "./Reveal";
import PostCard from "./PostCard";

export default function BlogHighlights() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="grain bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">The Journal</span>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-6xl">
              Stories from <em className="italic text-chili">our kitchen</em>
            </h2>
            <p className="mt-5 max-w-xl text-cocoa-500">
              Guides, recipes and tips from Nana Sans, your air-conditioned Indian restaurant in the heart of Canggu,
              Bali.
            </p>
          </div>
          <Link to="/blog" className="btn-outline self-start md:self-auto">
            Read the Journal
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 120}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
