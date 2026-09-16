import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { assetUrl, featuredCreativeWorks, videoAssets } from '../../seo'
import styles from './projects.module.css'

export const metadata = { title: 'All case studies · Review' }
export const dynamic = 'force-dynamic'

// Discover pages in development so this inventory stays complete as work is added.
async function findPages(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) return findPages(file)
    return entry.name === 'page.jsx' ? [file] : []
  }))
  return nested.flat()
}

async function projectPreview(source, href) {
  if (href === '/work/old-projects/barbour-international-puffer-fooh') {
    return assetUrl('/images/barbour_frasers-16x9-15s_10-00-06-26-ezgif.com-png-to-webp-converter.webp')
  }
  const video = videoAssets.find((item) => item.page === href)
  if (video) return assetUrl(video.thumbnailUrl)
  const poster = source.match(/poster="([^"]+)"/)
  if (poster) return poster[1]
  const vimeo = source.match(/https:\/\/player\.vimeo\.com\/video\/(\d+)(?:\?h=([a-z0-9]+))?/)
  if (!vimeo) return null
  try {
    const url = `https://vimeo.com/${vimeo[1]}${vimeo[2] ? `/${vimeo[2]}` : ''}`
    const response = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}&width=640`, {
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 3600 },
    })
    if (!response.ok) return null
    return (await response.json()).thumbnail_url || null
  } catch {
    return null
  }
}

export default async function ProjectsReviewPage() {
  // Archived work must never be listed publicly, even if someone knows this URL.
  if (process.env.NODE_ENV !== 'development') notFound()

  const appDirectory = path.join(process.cwd(), 'app')
  const files = await findPages(path.join(appDirectory, 'work'))
  const projects = await Promise.all(files.map(async (file) => {
    const source = await readFile(file, 'utf8')
    const href = '/' + path.relative(appDirectory, path.dirname(file)).split(path.sep).join('/')
    const featured = featuredCreativeWorks.find((work) => work.path === href)
    return {
      href,
      title: featured?.name || source.match(/title:\s*'([^']+)'/)?.[1] || path.basename(path.dirname(file)),
      archived: href.includes('/old-projects/'),
      image: await projectPreview(source, href),
    }
  }))
  projects.sort((a, b) => Number(a.archived) - Number(b.archived) || a.title.localeCompare(b.title))
  const archivedCount = projects.filter((project) => project.archived).length

  return (
    <div className={styles.canvas}><main id="main-content" className={styles.review}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Portfolio inventory · Local review</p>
        <h1>All case studies<span>.</span></h1>
        <p>{projects.length} pages to explore. {projects.length - archivedCount} featured, {archivedCount} archived.</p>
        <a href="/other/work">View featured work ↗</a>
      </header>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <a key={project.href} href={project.href} className={styles.card}>
            <div className={styles.preview}>
              {project.image ? (
                <Image src={project.image} alt="" fill unoptimized sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" style={{ objectFit: 'cover' }} />
              ) : <span className={styles.placeholder}>{project.title}<small>Open to explore the project</small></span>}
              <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className={styles.details}>
              <span className={project.archived ? styles.archived : styles.featured}>{project.archived ? 'Archived' : 'Featured'}</span>
              <h2>{project.title} <span aria-hidden="true">↗</span></h2>
              <p>{project.href}</p>
            </div>
          </a>
        ))}
      </div>
    </main></div>
  )
}
