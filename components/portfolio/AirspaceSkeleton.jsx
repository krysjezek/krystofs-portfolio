export default function AirspaceSkeleton({ width = "5em" }) {
  return <span className="airspace-skeleton airspace-shimmer" style={{ width }}>
    <span className="sr-only">Loading…</span>
  </span>;
}
