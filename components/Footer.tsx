'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="fixed bottom-2 right-2 text-xs text-zinc-500 opacity-40 hover:opacity-100 transition-opacity">
      <Link href="/privacy" className="mr-3 hover:underline">
        Privacy
      </Link>
      <Link href="/help" className="hover:underline">
        Help
      </Link>
    </footer>
  )
}
