export default function CaseStudySummary({ items, ariaLabel = 'Case study summary' }) {
  return (
    <section className="main-resume" aria-label={ariaLabel} data-reveal>
      <div className="w-layout-blockcontainer container-3 nopad w-container">
        <div className="div-block-141 credits case-study">
          <dl className="case-study-grid">
            {items.map((item) => (
              <div className="case-study-column" key={item.label}>
                <dt className="div-block-143">
                  <span className="label">{item.label}</span>
                </dt>
                <dd className="div-block-143">
                  <p className="paragraph">{item.answer}<br /></p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
