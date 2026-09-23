import Home from "@/components/portfolio/Home";
import JsonLd from "@/components/JsonLd";
import { pageStructuredData } from "./seo";

export default function Page() {
  return (
    <>
      <JsonLd data={pageStructuredData("/")} />
      <Home />
    </>
  );
}
