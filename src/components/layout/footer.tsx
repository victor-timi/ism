import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--ism-border)] bg-[var(--ism-bg)]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--ism-fg)]">
              ISM
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ism-fg-muted)]">
              Helping international students find jobs, housing, and discounts in Australia.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ism-fg-muted)]">
              Browse
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/hub?type=jobs" className="text-[var(--ism-fg)] transition-opacity hover:opacity-70">
                  Jobs
                </Link>
              </li>
              <li>
                <Link href="/hub?type=housing" className="text-[var(--ism-fg)] transition-opacity hover:opacity-70">
                  Housing
                </Link>
              </li>
              <li>
                <Link href="/hub?type=discounts" className="text-[var(--ism-fg)] transition-opacity hover:opacity-70">
                  Discounts
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ism-fg-muted)]">
              Company
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-[var(--ism-fg)] transition-opacity hover:opacity-70">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--ism-fg)] transition-opacity hover:opacity-70">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--ism-fg-muted)]">
              Legal
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-[var(--ism-fg)] transition-opacity hover:opacity-70">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[var(--ism-fg)] transition-opacity hover:opacity-70">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-[var(--ism-border)] pt-8 text-center text-xs tracking-wider text-[var(--ism-fg-muted)]">
          &copy; {new Date().getFullYear()} International Students Movement. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
