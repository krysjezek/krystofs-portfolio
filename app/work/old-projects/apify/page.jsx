import EditorialPage from '@/components/portfolio/EditorialPage'
import pages from '@/content/pages.json'
import { pageSeo, noIndex } from '@/app/seo'
const page = pages['/work/old-projects/apify']
export const metadata = { title: page.title, description: page.description, ...pageSeo('/work/old-projects/apify'), ...noIndex }
export default function Page() { return <EditorialPage page={page} route="/work/old-projects/apify" /> }
