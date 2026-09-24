import Image from "next/image";
import Icon from "./Icon";
import { mediaUrl } from "@/lib/media";

export const previewIcons = ["eye", "arrow", "email", "copy", "check", "location"];

export function previewAttributes(preview) {
  return {
    "data-hint": preview.title,
    "data-hint-detail": preview.detail || "",
    "data-hint-meta": preview.meta || "",
    "data-hint-icon": preview.icon || "eye",
    "data-hint-image": preview.image || "",
  };
}

export default function PreviewContent({ preview = {}, cursor = false }) {
  return (
    <span className="context-content" data-rich={preview.detail || preview.meta ? "" : undefined}>
      <span className="context-heading">
        <span className="context-image" hidden={preview.image !== "university"}>
          <Image src={mediaUrl("/images/cvutlogo-2.png")} width={704} height={704} sizes="32px" alt="" />
        </span>
        <span className="cursor-hint-icon" hidden={!!preview.image}>
          {cursor ? previewIcons.map((name) => <Icon key={name} name={name} data-icon={name} size="compact" />) : <Icon name={preview.icon || "eye"} size="compact" />}
        </span>
        <span className="cursor-hint-label">{preview.title}</span>
      </span>
      <span className="context-detail" hidden={!preview.detail}>{preview.detail}</span>
      <span className="context-meta" hidden={!preview.meta}>{preview.meta}</span>
    </span>
  );
}
