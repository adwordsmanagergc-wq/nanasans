import { BookOpen, Leaf } from "lucide-react";
import type { Diet, MenuCourse } from "@/data/menu";
import { formatPrice } from "@/react-app/lib/menu";

export function DietTag({ diet }: { diet: Diet }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] ${
        diet === "vegan" ? "bg-emerald-500/15 text-emerald-300" : "bg-lime-500/10 text-lime-200"
      }`}
    >
      <Leaf className="h-3 w-3" aria-hidden="true" />
      {diet === "vegan" ? "Vegan" : "Vegetarian"}
    </span>
  );
}


interface MenuCoursePanelProps {
  course: MenuCourse;
  /** Heading level for the course name; dish names use the next level down. */
  level?: 2 | 3;
  onPrintedPage?: () => void;
}

/** One menu course (e.g. "Meat Curries") with every dish, price and note. */
export default function MenuCoursePanel({ course, level = 3, onPrintedPage }: MenuCoursePanelProps) {
  const CourseHeading = level === 2 ? "h2" : "h3";
  const DishHeading = level === 2 ? "h3" : "h4";
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <CourseHeading className="font-display text-3xl sm:text-4xl">{course.name}</CourseHeading>
            {course.diet && <DietTag diet={course.diet} />}
          </div>
          {course.note && <p className="mt-2 max-w-xl text-sm italic text-paper/55">{course.note}</p>}
        </div>
        <div className="flex items-center gap-4">
          {course.price && (
            <span className="rounded-full border border-saffron-400/40 px-4 py-1.5 font-display text-lg text-saffron-300">
              All {formatPrice(course.price)}
            </span>
          )}
          {onPrintedPage && (
            <button
              type="button"
              onClick={onPrintedPage}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-paper/60 transition-colors hover:text-saffron-300"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Printed page
            </button>
          )}
        </div>
      </div>
      <ul className="mt-6 grid gap-x-16 border-t border-white/10 md:grid-cols-2">
        {course.dishes.map((dish) => (
          <li key={dish.name} className="border-b border-white/10 py-5">
            <div className="flex items-baseline gap-3">
              <DishHeading className="font-display text-xl">{dish.name}</DishHeading>
              {dish.price && (
                <>
                  <span className="mb-1.5 flex-1 border-b border-dotted border-white/20" aria-hidden="true" />
                  <span className="font-display text-xl text-saffron-300">{formatPrice(dish.price)}</span>
                </>
              )}
            </div>
            {dish.description && <p className="mt-1.5 max-w-md text-sm leading-relaxed text-paper/60">{dish.description}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}
