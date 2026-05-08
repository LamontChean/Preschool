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

  // Simply copy as-is; sitemap.xml in public/ should already have correct URLs
  // (we manually maintain public/sitemap.xml with the right hostname and paths)

  // Ensure dist directory exists
  fs.mkdirSync(path.dirname(distSitemap), { recursive: true })
  fs.writeFileSync(distSitemap, sitemap, 'utf8')
  console.log('Copied sitemap to', distSitemap)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
