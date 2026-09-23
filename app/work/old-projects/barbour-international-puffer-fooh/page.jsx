import EditorialPage from '@/components/portfolio/EditorialPage'
import pages from '@/content/pages.json'
import { pageSeo, noIndex } from '@/app/seo'
const page = pages['/work/old-projects/barbour-international-puffer-fooh']
export const metadata = { title: page.title, description: page.description, ...pageSeo('/work/old-projects/barbour-international-puffer-fooh'), ...noIndex }
export default function Page() { return <EditorialPage page={page} route="/work/old-projects/barbour-international-puffer-fooh" /> }
