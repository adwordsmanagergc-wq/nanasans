import { ArrowUpRight, CalendarCheck, Clock, MapPin, Phone } from "lucide-react";
import { SITE } from "@/data/site";
import Reveal from "./Reveal";

export default function VisitSection() {
  return (
    <section id="visit" className="relative overflow-hidden bg-ink py-24 text-paper sm:py-32">
      <div
        className="pointer-events-none absolute -bottom-48 -left-40 h-[34rem] w-[34rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(180,67,43,0.7), transparent 65%)" }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <span className="eyebrow text-saffron-400">Visit Us</span>
          <h2 className="mt-5 font-display text-4xl font-light leading-[1.05] sm:text-6xl">
            Pull up a chair, <em className="italic text-saffron-400">you're family</em>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-paper/65">
            Find us on Jalan Raya Canggu, a few minutes from the beach. Walk-ins are always welcome; for groups and
            peak dinner hours we recommend booking ahead on WhatsApp.
          </p>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            <div className="bg-ink-800 p-6">
              <dt className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-saffron-400">
                <MapPin className="h-3.5 w-3.5" /> Address
              </dt>
              <dd className="mt-3 leading-relaxed text-paper/85">
                {SITE.addressLine1}
                <br />
                {SITE.addressLine2}
              </dd>
            </div>
            <div className="bg-ink-800 p-6">
              <dt className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-saffron-400">
                <Clock className="h-3.5 w-3.5" /> Hours
              </dt>
              <dd className="mt-3 leading-relaxed text-paper/85">
                Monday – Sunday
                <br />
                11:00 am – 10:00 pm
              </dd>
            </div>
            <div className="bg-ink-800 p-6 sm:col-span-2">
              <dt className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-saffron-400">
                <Phone className="h-3.5 w-3.5" /> Reservations & enquiries
              </dt>
              <dd className="mt-3">
                <a
                  href={`https://wa.me/${SITE.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-2xl transition-colors hover:text-saffron-300"
                >
                  {SITE.phoneDisplay}
                </a>
                <span className="ml-3 text-sm text-paper/50">WhatsApp</span>
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={SITE.bookUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <CalendarCheck className="h-4 w-4" />
              Book a Table
            </a>
            <a href={SITE.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <MapPin className="h-4 w-4" />
              Get Directions
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="flex flex-col gap-4">
          <div className="relative min-h-[360px] flex-1 overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-700">
            <iframe
              title="Map showing Nana Sans Tandoori Kitchen on Jalan Raya Canggu"
              src={SITE.mapEmbedUrl}
              className="absolute inset-0 h-full w-full [filter:grayscale(0.6)_sepia(0.35)_contrast(1.05)_brightness(0.9)]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <a
              href={SITE.gojekUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-ink-800 p-5 transition-colors hover:border-saffron-400/60"
            >
              <span>
                <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-paper/50">Delivery</span>
                <span className="mt-1 block font-display text-xl">GoFood</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-paper/40 transition-all group-hover:rotate-45 group-hover:text-saffron-400" />
            </a>
            <a
              href={SITE.grabUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-ink-800 p-5 transition-colors hover:border-saffron-400/60"
            >
              <span>
                <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-paper/50">Delivery</span>
                <span className="mt-1 block font-display text-xl">GrabFood</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-paper/40 transition-all group-hover:rotate-45 group-hover:text-saffron-400" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
