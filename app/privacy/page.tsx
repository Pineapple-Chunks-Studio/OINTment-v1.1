// @ts-nocheck
import { readFile } from 'fs/promises'
import { marked } from 'marked'
import HexBackground from '../../components/HexBackground'

export default async function PrivacyPage() {
  const md = await readFile(process.cwd() + '/privacy.md', 'utf8')
  const html = marked.parse(md)
  return (
    <div className="relative min-h-screen overflow-hidden">
      <HexBackground className="hex-fade" reveal={false} />
      <div className="relative z-10 max-w-3xl mx-auto p-10 fade-in-fast">
        <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-xl p-6 backdrop-blur-sm prose prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </div>
  )
}
