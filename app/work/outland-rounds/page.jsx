import CaseStudy from '@/components/portfolio/CaseStudy'
import projects from '@/content/cases.json'
import { pageSeo } from '@/app/seo'

export const metadata = pageSeo('/work/outland-rounds')

export default function Page() {
  return <CaseStudy project={projects.find(project => project.path === '/work/outland-rounds')} />
}
