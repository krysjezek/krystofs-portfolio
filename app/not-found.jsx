import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="utility-page-wrap">
        <div className="utility-page-content w-form">
          <h2 className="heading-2 center">Hmmm, where did this page go?</h2>
          <a data-w-id="e6c9d7de-0ee7-9474-a32b-0c07cef79ca4" style={{ backgroundColor: 'rgba(30,39,59,0.5)', transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} href="/" className="button inverted-border w-button">Back to home page</a>
        </div>
      </div>
      <Footer />
    </>
  )
}
