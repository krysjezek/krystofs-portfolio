import Header from '@/components/portfolio/Header'
import Card from '@/components/portfolio/Card'
import gallery from '@/content/gallery.json'
import { pageSeo } from '@/app/seo'
export const metadata = {title:'Selected work', ...pageSeo('/other/work')}
export default function Page(){const cards=[...gallery.work.cards,...gallery.fun.cards].filter(card=>card.href?.startsWith('/work/'));return <><Header /><main id="main-content"><header className="work-index-heading"><h1 tabIndex={-1}>Selected work</h1></header><div className="work-index">{cards.map(card=><Card key={card.id} card={card}/>)}</div></main></>}
