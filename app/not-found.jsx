import Header from "@/components/portfolio/Header";
import Recommendations from "@/components/portfolio/Recommendations";
import { HomeLink } from "@/components/portfolio/Links";

export default function NotFound() {
  return (
    <>
      <Header backLabel="Home" />
      <main id="main-content">
        <header className="not-found-introduction case-introduction">
          <div className="case-overview">
            <div className="case-title not-found-title">
              <h1 tabIndex={-1}>This page doesn’t exist.</h1>
              <p>404 · Page not found</p>
            </div>
            <p>The page may have moved, or the address may be incorrect.</p>
            <p>
              Take a look at a case study below, or head back to the homepage.
            </p>
          </div>
        </header>
        <Recommendations />
        <div className="return-home">
          <HomeLink>Home</HomeLink>
        </div>
      </main>
    </>
  );
}
