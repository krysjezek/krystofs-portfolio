import Link from 'next/link'

export default function WorkPageHeader({ label, title, publicationDate, children, ...rest }) {
  return (
    <div className="work-header-wrap" {...rest}>
      <div className="work-header-container">
        <div className="work-h1-wrap">
          <div className="div-block-112">
            <div className="label green">{label}</div>
            <h1 className="heading-h1">{title}</h1>
            {publicationDate ? <div className="label gray">Case study published {publicationDate}</div> : null}
          </div>
          <div className="back-block">
            <Link href="/" className="button inverted-border w-button">Back to home</Link>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
