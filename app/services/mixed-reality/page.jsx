import EditorialPage from '@/components/portfolio/EditorialPage'
import pages from '@/content/pages.json'
import { pageSeo } from '@/app/seo'
const page = pages['/services/mixed-reality']
export const metadata = { title: page.title, description: page.description, ...pageSeo('/services/mixed-reality') }
export default function Page() { return <EditorialPage page={page} route="/services/mixed-reality" /> }
