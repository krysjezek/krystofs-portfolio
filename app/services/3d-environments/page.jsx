import Worlds from "@/components/portfolio/Worlds";
import { pageSeo } from "@/app/seo";
export const metadata = {
  title: "3D Worlds",
  description:
    "Art-directed CGI worlds for brands and studios, extending across motion, stills, launches and campaign content.",
  ...pageSeo("/services/3d-environments"),
};
export default function Page() {
  return <Worlds />;
}
