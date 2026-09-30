import { useEffect, useState } from "react";
import { ArrowUpRight, Instagram, Play } from "lucide-react";
import { SITE } from "@/data/site";
import Reveal from "./Reveal";

interface FeedPost {
  id: string;
  permalink: string;
  image: string;
  caption: string;
  isVideo: boolean;
}

// Behold (behold.so) turns the Instagram account into a JSON feed that updates
// whenever a new post goes up. Set VITE_INSTAGRAM_FEED_URL to switch the grid on.
const FEED_URL = import.meta.env.VITE_INSTAGRAM_FEED_URL;
const MAX_POSTS = 8;

type RawPost = {
  id: string;
  permalink: string;
  mediaType?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  caption?: string;
  prunedCaption?: string;
  sizes?: { medium?: { mediaUrl?: string } };
};

function normalise(data: unknown): FeedPost[] {
  const raw: RawPost[] = Array.isArray(data) ? data : ((data as { posts?: RawPost[] })?.posts ?? []);
  return raw
    .map((p) => ({
      id: p.id,
      permalink: p.permalink,
      image: p.sizes?.medium?.mediaUrl ?? (p.mediaType === "VIDEO" ? p.thumbnailUrl : p.mediaUrl) ?? "",
      caption: p.prunedCaption ?? p.caption ?? "",
      isVideo: p.mediaType === "VIDEO",
    }))
    .filter((p) => p.image && p.permalink)
    .slice(0, MAX_POSTS);
}

export default function InstagramSection() {
  const [posts, setPosts] = useState<FeedPost[]>([]);

  useEffect(() => {
    if (!FEED_URL) return;
    const controller = new AbortController();
    fetch(FEED_URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => setPosts(normalise(data)))
      .catch(() => setPosts([]));
    return () => controller.abort();
  }, []);

  return (
    <section id="instagram" className="grain bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Follow Us</span>
            <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-6xl">
              Fresh from the <em className="italic text-chili">tandoor</em>, straight to your feed
            </h2>
            <p className="mt-5 max-w-xl text-cocoa-500">
              New dishes, specials and life around the table at Nana Sans. Follow {SITE.instagramHandle} so you never
              miss a thing.
            </p>
          </div>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn self-start bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white shadow-[0_12px_30px_-12px_rgba(221,42,123,0.7)] hover:-translate-y-0.5 md:self-auto"
          >
            <Instagram className="h-4 w-4" />
            Follow {SITE.instagramHandle}
          </a>
        </Reveal>

        {posts.length > 0 ? (
          <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {posts.map((post, i) => (
              <Reveal key={post.id} delay={(i % 4) * 80}>
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-ink-600 to-ink"
                  aria-label={post.caption ? `Instagram post: ${post.caption.slice(0, 80)}` : "View post on Instagram"}
                >
                  <img
                    src={post.image}
                    alt={post.caption ? post.caption.slice(0, 120) : "Nana Sans on Instagram"}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-110"
                  />
                  {post.isVideo && (
                    <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-ink/60 text-paper backdrop-blur">
                      <Play className="h-3.5 w-3.5 fill-current" />
                    </span>
                  )}
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/30 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {post.caption && <p className="line-clamp-3 text-sm leading-snug text-paper/90">{post.caption}</p>}
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-saffron-300">
                      View post <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-14">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-between gap-6 overflow-hidden rounded-[1.75rem] bg-ink p-8 text-paper sm:flex-row sm:p-12"
            >
              <div className="flex items-center gap-5">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]">
                  <Instagram className="h-8 w-8 text-white" />
                </span>
                <div>
                  <p className="font-display text-3xl">{SITE.instagramHandle}</p>
                  <p className="mt-1 text-sm text-paper/60">Our latest plates, specials and stories.</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-saffron-300">
                See our feed
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </span>
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
