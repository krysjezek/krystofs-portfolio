import CaseStudy from '@/components/portfolio/CaseStudy'
import projects from '@/content/cases.json'
import { pageSeo } from '@/app/seo'
export const metadata = pageSeo('/work/the-mag-w-rap-2025')
export default function Page() { return <CaseStudy project={projects.find(project => project.path === '/work/the-mag-w-rap-2025')} /> }
