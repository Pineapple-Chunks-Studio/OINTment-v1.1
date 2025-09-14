// @ts-nocheck
import HexBackground from '../../components/HexBackground'

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 shadow-xl p-6 backdrop-blur-sm">
      {children}
    </div>
  )
}

export default function HelpPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <HexBackground className="hex-fade" reveal={false} />
      <div className="relative z-10 max-w-3xl mx-auto p-10 space-y-6 fade-in-fast">
        <div className="text-right leading-tight space-y-1">
          <h1 className="text-5xl font-bold text-white">Help &amp; Support</h1>
          <p className="text-sm text-white">We're here for you</p>
        </div>
        <Card>
          <p className="text-sm mb-2">Reach our support team via:</p>
          <ul className="text-sm text-zinc-300 space-y-2">
            <li>
              Email: <a className="text-emerald-400 hover:underline" href="mailto:support@ointment.dev">support@ointment.dev</a>
            </li>
            <li>
              GitHub Issues:{' '}
              <a
                className="text-emerald-400 hover:underline"
                href="https://github.com/Pineapple-Chunks/OINTment/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                Project Tracker
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
