import { noIndex } from '../seo'

export const metadata = {
  ...noIndex,
}

export default function TestLayout({ children }) {
  return children
}
