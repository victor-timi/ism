// Studio has its own isolated layout — no nav/footer from the main site.
// html/body tags are provided by the root layout.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
