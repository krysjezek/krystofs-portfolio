import Image from "next/image";
import emojis from "@/content/about-emojis.json";
import { mediaUrl } from "@/lib/media";

// Keep the authored Unicode in content; render these emojis consistently on
// every platform without downloading or relying on a system emoji font.
export default function EmojiText({ text }) {
  return text.split(/(✈️|🍺)/u).map((part, index) => {
    const emoji = emojis[part];
    return emoji ? (
      <Image
        key={index}
        className="inline-emoji"
        src={mediaUrl(emoji.src)}
        alt={emoji.label}
        width={64}
        height={64}
        sizes="18px"
      />
    ) : part;
  });
}
