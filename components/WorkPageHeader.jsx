export default function WorkPageHeader({ label, title, children }) {
  return (
    <div className="work-header-wrap">
      <div className="work-header-container">
        <div className="work-h1-wrap">
          <div className="div-block-112">
            <div className="label green">{label}</div>
            <h1 className="heading-h1">{title}</h1>
          </div>
          <div className="back-block">
            <a href="/" className="button inverted-border w-button">Back to home</a>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
