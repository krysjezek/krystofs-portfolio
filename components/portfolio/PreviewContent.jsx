import Icon from "./Icon";
import IdentityTile from "./IdentityTile";

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
        {preview.image && <IdentityTile src={preview.image} className="context-image" />}
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
