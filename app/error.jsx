"use client";
import Header from "@/components/portfolio/Header";
export default function ErrorPage({ reset }) {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="not-found-introduction editorial-three"
      >
        <h1 tabIndex={-1}>Couldn’t open this page</h1>
        <p>Please try again.</p>
        <div>
          <button type="button" className="button" onClick={reset}>
            Try again
          </button>
        </div>
      </main>
    </>
  );
}
