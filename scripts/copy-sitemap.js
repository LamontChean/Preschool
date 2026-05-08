import fs from 'fs'
import path from 'path'

// Copies public/sitemap.xml to dist/sitemap.xml after build.
// It normalizes the hostname to match package.json homepage if present.

const root = process.cwd()
const publicSitemap = path.join(root, 'public', 'sitemap.xml')
const distSitemap = path.join(root, 'dist', 'sitemap.xml')

function readPackageHomepage() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
    return pkg.homepage || ''
  } catch (e) {
    return ''
  }
}

async function main() {
  if (!fs.existsSync(publicSitemap)) {
    console.log('No public/sitemap.xml found; skipping copy.')
    return
  }

  const sitemapRaw = fs.readFileSync(publicSitemap, 'utf8')
  let sitemap = sitemapRaw

  // If package.json has homepage, replace any existing hostnames with that hostname.
  const homepage = readPackageHomepage()
  if (homepage) {
    try {
      const url = new URL(homepage)
      const hostname = url.origin + (url.pathname.endsWith('/') ? url.pathname.slice(0, -1) : url.pathname)
      // Replace any occurrences of previous hostnames (simple heuristic)
      sitemap = sitemap.replace(/https?:\/\/[^\/<\"]+\/[A-Za-z0-9_\-\/]*?/g, (match) => {
        // keep path from the match
        try {
          const m = new URL(match)
          return hostname + m.pathname
        } catch (e) {
          return match
        }
      })
    } catch (e) {
      // ignore
    }
  }

  // Ensure dist directory exists
  fs.mkdirSync(path.dirname(distSitemap), { recursive: true })
  fs.writeFileSync(distSitemap, sitemap, 'utf8')
  console.log('Copied sitemap to', distSitemap)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
