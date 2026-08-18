import Link from "next/link";
import { SITE } from "@/lib/site-config";

/**
 * The GP monogram is Gabriella Peña's initials — the founder. Source: the
 * archived "¿Por qué KINÉTIKA?" section.
 *
 * This is a type-based stand-in for the real logo. The original was a vector
 * lockup with an interlocking G and P above a Didone wordmark. Ask the team for
 * the SVG and swap this out; the layout won't need to change.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-baseline gap-2.5 ${className}`}
      aria-label={`${SITE.name} — inicio`}
    >
      <span
        aria-hidden="true"
        className="font-display text-2xl leading-none tracking-tight"
      >
        GP
      </span>
      <span className="font-display text-xl leading-none tracking-[0.18em]">
        KINÉTIKA
      </span>
    </Link>
  );
}
