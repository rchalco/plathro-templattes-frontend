import fs from 'fs'
import { copyFile, mkdir, readdir, stat } from 'fs/promises'
import path from 'path'

const srcRoot = path.resolve(process.cwd(), 'src', 'assets', 'images')
const destRoot = path.resolve(process.cwd(), 'dist', 'assets')

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true })
  } catch (err) {
    // ignore
  }
}

async function copyDir(src, dest) {
  const entries = await readdir(src, { withFileTypes: true })
  await ensureDir(dest)

  await Promise.all(entries.map(async (entry) => {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else if (entry.isFile()) {
      await copyFile(srcPath, destPath)
    }
  }))
}

async function main() {
  if (!fs.existsSync(srcRoot)) {
    console.warn(`Source images folder not found: ${srcRoot}`)
    return
  }

  try {
    await copyDir(srcRoot, destRoot)
    console.log(`Copied images from ${srcRoot} to ${destRoot}`)
  } catch (err) {
    console.error('Error copying images:', err)
    process.exitCode = 1
  }
}

main()
