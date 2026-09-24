import Image from "next/image";
import icons from "@/content/icons.json";
import { mediaUrl } from "@/lib/media";

// Identity artwork is decorative beside its name, never a separate control.
export default function IdentityTile({ src, name, className = "" }) {
  const artwork = src === "university" ? "/images/cvutlogo-2.png" : src || icons[name];
  const designer = artwork === "designer";
  if (!artwork) return null;

  return (
    <span
      className={`identity-tile ${className}`.trim()}
      data-designer={designer ? "" : undefined}
      aria-hidden="true"
    >
      {!designer && <Image
        src={mediaUrl(artwork)}
        alt=""
        fill
        sizes="15px"
        unoptimized={artwork.endsWith(".svg")}
      />}
    </span>
  );
}
