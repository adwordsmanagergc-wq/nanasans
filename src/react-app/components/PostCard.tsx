import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/data/blogPosts";
import { formatPostDate, imgSize } from "@/react-app/lib/utils";

/** Editorial card linking to a journal post. */
export default function PostCard({ post, headingLevel = "h3" }: { post: BlogPost; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <Link to={`/blog/${post.slug}`} className="group flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink/10">
        <img
          src={post.image}
          alt={post.imageAlt}
          {...imgSize(post.image)}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-saffron-600">
          {formatPostDate(post.date)} <span className="mx-2 text-ink/25">/</span> {post.readTime}
        </p>
        <Heading className="mt-3 font-display text-2xl leading-snug text-ink transition-colors group-hover:text-chili">
          {post.title}
        </Heading>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-cocoa-500">{post.excerpt}</p>
      </div>
    </Link>
  );
}
