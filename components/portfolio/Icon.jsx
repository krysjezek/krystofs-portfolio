import icons from "@/content/interface-icons.json";

const sizes = {
  compact: "var(--icon-compact)",
  inline: "var(--icon-inline)",
};

// Exact Figma exports retain the library's 24px canvas. A mask lets every
// instance inherit its label color without editing the source artwork.
export default function Icon({ name, size = "inline", className = "", ...props }) {
  return (
    <span
      {...props}
      className={`ui-icon ${className}`.trim()}
      data-ui-icon={name}
      aria-hidden="true"
      style={{
        "--icon-source": `url("${icons[name].src}")`,
        "--icon-size": sizes[size],
      }}
    />
  );
}
