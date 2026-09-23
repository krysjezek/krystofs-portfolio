import CaseStudy from '@/components/portfolio/CaseStudy'
import projects from '@/content/cases.json'
import { pageSeo } from '@/app/seo'
export const metadata = pageSeo('/work/the-vsx-sports-bra')
export default function Page() { return <CaseStudy project={projects.find(project => project.path === '/work/the-vsx-sports-bra')} /> }
