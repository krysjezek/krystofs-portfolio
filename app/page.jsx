import Home from "@/components/portfolio/Home";
import JsonLd from "@/components/JsonLd";
import { homepageStructuredData } from "./seo";

export default function Page() {
  return (
    <>
      <JsonLd data={homepageStructuredData()} />
      <Home />
    </>
  );
}
