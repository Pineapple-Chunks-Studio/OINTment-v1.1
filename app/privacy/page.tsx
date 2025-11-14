// @ts-nocheck
import HexBackground from '../../components/HexBackground'

const sectionClass =
  'rounded-2xl border border-cyan-500/20 bg-zinc-900/70 p-6 md:p-8 shadow-lg shadow-cyan-500/10 backdrop-blur'

export default function PrivacyPage() {
  const sections = [
    {
      title: '1. Introduction',
      content: (
        <p className="text-zinc-200">
          OINTment is a web-based application that helps developers and teams understand and
          improve their software projects by ingesting source code and documents, mapping
          dependencies and commit history, and producing AI-generated analyses. This privacy
          policy explains how OINTment (referred to as “we” or “us”) collects, uses, shares, and
          protects your personal data when you use the application. It also describes your rights
          under the EU General Data Protection Regulation (GDPR).
        </p>
      ),
    },
    {
      title: '2. Who is the data controller?',
      content: (
        <p className="text-zinc-200">
          The data controller is the entity that determines the purposes and means of the
          processing of personal data. OINTment is currently operated by Pineapple-Chunks Studio
          (contact email: privacy@pineapplechunks.studio). If the operation of the app changes or
          if a partner organisation is designated as the controller, we will update this notice
          accordingly.
        </p>
      ),
    },
    {
      title: '3. Personal data we collect and why',
      content: (
        <div className="space-y-6 text-zinc-200">
          <div>
            <h3 className="font-semibold text-cyan-300">3.1 Data you provide directly</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm md:text-base">
              <li>
                <strong>Repository details –</strong> When you submit a repository URL (e.g. owner/repo)
                or upload a ZIP archive via the /ingest endpoint, the form data includes the
                repository name and branch, or your uploaded file. We use this data to fetch your
                code from GitHub or to read your uploaded archive. The ingest route checks the repo
                and branch parameters and obtains a ZIP file from GitHub or from your upload.
              </li>
              <li>
                <strong>Documentation –</strong> You may upload project documentation (e.g. PRD, design
                estimates) alongside code. These files are read, converted to text, and truncated
                to the first 10,000 characters. We store only the extracted text, file names, and
                document type, as provided in the docs_meta form field.
              </li>
              <li>
                <strong>GitHub authentication token –</strong> If you authorize OINTment to access a private
                repository, a GitHub personal access token is included either in the request header
                (x-github-token) or as a github_token cookie. We do not store your token beyond the
                duration of your session; it is kept in a secure cookie and used only to fetch
                repository content.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-cyan-300">3.2 Data we collect automatically</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm md:text-base">
              <li>
                <strong>Repository file list and code snippets –</strong> During ingestion, the application
                downloads the repository ZIP file, extracts the list of file names, and loads the
                contents of each file (truncated to 10,000 characters). This data is necessary to
                build dependency graphs, run AI analyses, and provide visualisations.
              </li>
              <li>
                <strong>Commit metadata –</strong> To create the 3D commit map and to classify commits,
                OINTment may fetch commit hashes, authors, timestamps, commit messages, and changed
                paths from GitHub. Commit messages and metadata are passed to AI models for
                classification and jitter calculation.
              </li>
              <li>
                <strong>Analysis results –</strong> AI-generated summaries, code reviews (“roasts”), fix
                suggestions, and AI-artifact detection results are returned from the AI provider and
                stored in the app to display to you.
              </li>
              <li>
                <strong>Cookies and session data –</strong> We use cookies to manage your session and
                authentication. The github_token cookie stores your GitHub access token so that
                requests to GitHub can be authenticated. Additional session cookies may be used to
                maintain state and to implement CSRF protection. These cookies are essential to the
                operation of the app and do not track you for advertising purposes.
              </li>
              <li>
                <strong>Local device caches –</strong> To make repeat visits faster, we store your latest
                ingest result, repository selection, commit-map payloads (SHA, message, status, and
                offsets), Vibe Killer results, and Mission Control dashboards in your browser’s
                localStorage. These caches remain on your device, are never transmitted back to us,
                and can be cleared at any time from the UI or via your browser settings.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-cyan-300">3.3 Data from third parties</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm md:text-base">
              <li>
                <strong>GitHub –</strong> When you provide a repository URL, we request metadata (e.g.
                default branch) and download the repository archive from GitHub’s codeload domain.
                This may include commit history and contributor information that contains names and
                email addresses. This data is used solely to perform the requested analyses.
              </li>
              <li>
                <strong>OpenAI/AIML API –</strong> To generate summaries, reviews, and classifications, we
                send portions of your repository file list, documentation, commit messages, and code
                snippets to an AI API operated by OpenAI or an alternative AI provider, as
                configured in the environment variables. The AI provider processes this data to
                return the requested analysis.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-cyan-300">3.4 Ephemeral orchestration data</h3>
            <p className="mt-3 text-sm md:text-base">
              <strong>OINT creation state –</strong> When you launch the Mission Control/OINT workflow, we
              keep the uploaded documents, repository file list, and sampled code snippets in an
              in-memory store on the server while the dashboard is assembled. This cache is discarded
              once the response is returned and is never written to disk.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: '4. How we use your personal data',
      content: (
        <ul className="list-disc space-y-2 pl-6 text-zinc-200 text-sm md:text-base">
          <li>
            Provide and improve the service – ingest your repository, parse files and documentation,
            fetch commit history, and display dependency graphs, matrices, and commit maps while
            generating AI-assisted summaries and recommendations.
          </li>
          <li>Authenticate requests using your GitHub token to access private repositories.</li>
          <li>
            Generate analyses using AI by sending file lists, code snippets, and commit data to AI
            models.
          </li>
          <li>Communicate with you regarding service-related announcements or enquiries.</li>
          <li>Ensure security, detect abuse, debug issues, and improve stability.</li>
          <li>
            Run the OINT dashboard – the /api/oint endpoints reuse the in-memory document/code
            snapshot captured during creation so that we can populate the Mission Control view
            without re-uploading your materials.
          </li>
          <li>We do not use your personal data for advertising or marketing purposes.</li>
        </ul>
      ),
    },
    {
      title: '5. Legal basis for processing',
      content: (
        <div className="space-y-4 text-zinc-200">
          <p>
            We rely on the following legal bases under the GDPR when processing personal data:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-sm md:text-base">
            <li>
              <strong>Consent (Article 6(1)(a)) –</strong> By uploading code or providing a repository URL
              and a GitHub token, you consent to our processing of that data for the purposes
              described in this policy. You may withdraw your consent at any time by stopping use of
              the app and clearing the github_token cookie. This will not affect processing that
              took place before your withdrawal.
            </li>
            <li>
              <strong>Legitimate interests (Article 6(1)(f)) –</strong> We have a legitimate interest in
              analysing code and commit history to provide insights to our users, to ensure the
              security of the platform, and to improve our services. When we rely on this basis, we
              assess whether our interests are overridden by your fundamental rights and freedoms.
            </li>
            <li>
              <strong>Contract performance (Article 6(1)(b)) –</strong> If we enter into a contract with you
              (e.g. a paid subscription or enterprise agreement), we process personal data to
              perform that contract.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '6. How we share your data',
      content: (
        <ul className="list-disc space-y-2 pl-6 text-zinc-200 text-sm md:text-base">
          <li>
            <strong>AI service providers –</strong> We send repository content (file lists, documentation,
            code snippets, commit messages, and metadata) to AI models hosted by OpenAI or other
            providers to obtain summaries and analyses. These providers act as data processors on
            our behalf and are bound to use your data only to provide the requested analysis.
          </li>
          <li>
            <strong>Hosting and infrastructure providers –</strong> These partners process logs and metadata
            to deliver the service securely and reliably.
          </li>
          <li>
            <strong>GitHub –</strong> When you provide a repository URL or token, we request repository
            archives, commit histories, and related metadata from GitHub’s APIs. GitHub is a separate
            data controller for the content of repositories.
          </li>
          <li>
            <strong>Dependency metadata & logos –</strong> Opening the Architecture Matrix triggers a
            request to the public npm registry for the dependency names extracted from your
            repository and displays Clearbit-hosted logos for those domains. Both services receive
            only package identifiers, never your authentication tokens.
          </li>
          <li>
            <strong>Legal or regulatory authorities –</strong> We may disclose personal data if required by
            law, regulation, legal process, or to protect the rights, property, or safety of
            OINTment or others.
          </li>
          <li>We do not sell your personal data to third parties.</li>
        </ul>
      ),
    },
    {
      title: '7. International transfers',
      content: (
        <p className="text-zinc-200">
          The AI providers and hosting services we use may be located outside of the European
          Economic Area (EEA). When personal data is transferred to a country that does not have an
          adequacy decision from the European Commission, we ensure appropriate safeguards are in
          place, such as Standard Contractual Clauses (SCCs) or another lawful transfer mechanism. A
          copy of these safeguards can be provided upon request.
        </p>
      ),
    },
    {
      title: '8. Data retention',
      content: (
        <div className="space-y-3 text-zinc-200">
          <p>We retain your personal data only for as long as necessary to fulfil the purposes above:</p>
          <ul className="list-disc space-y-2 pl-6 text-sm md:text-base">
            <li>
              Uploaded archives and extracted code snippets are processed in memory and are not
              stored beyond the current session unless you explicitly save the analysis. Temporary
              buffers are cleared when the response is returned.
            </li>
            <li>
              Analysis results (e.g. summaries, roasts, suggestions) may be kept in your session for
              convenience. If you have an account, we may retain these results until you delete the
              project or your account.
            </li>
            <li>
              Logs containing IP addresses, timestamps, and error messages are kept for up to 90
              days for security and debugging and then deleted or anonymised.
            </li>
            <li>
              If you withdraw consent or request deletion, we will remove your data unless retention
              is required by law or needed to protect our legal claims.
            </li>
            <li>
              Client-side caches (e.g. localStorage) stay on your device until you clear them from
              the UI or your browser. In-memory orchestration data that powers the OINT dashboard is
              automatically dropped after each request.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: '9. Your rights under the GDPR',
      content: (
        <div className="space-y-3 text-zinc-200">
          <p>Subject to certain conditions, you have the following rights:</p>
          <ul className="list-disc space-y-2 pl-6 text-sm md:text-base">
            <li>Right of access – request confirmation and obtain a copy of your personal data.</li>
            <li>Right to rectification – ask us to correct inaccurate or incomplete data.</li>
            <li>
              Right to erasure (“right to be forgotten”) – request deletion if data is no longer
              needed, you withdraw consent, or processing is unlawful.
            </li>
            <li>
              Right to restrict processing – request that we limit processing if you contest accuracy,
              processing is unlawful, or you need the data for legal claims.
            </li>
            <li>
              Right to data portability – request your data in a structured, commonly used,
              machine-readable format and, where technically feasible, have it transmitted to another
              controller.
            </li>
            <li>
              Right to object – object to processing based on legitimate interests on grounds relating
              to your particular situation.
            </li>
            <li>
              Right to withdraw consent – withdraw consent at any time without affecting previous
              processing.
            </li>
            <li>
              Right not to be subject to automated decision-making – we do not make decisions that
              produce legal or similarly significant effects without human involvement.
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{' '}
            <a
              href="mailto:privacy@pineapplechunks.studio"
              className="text-cyan-300 underline decoration-dotted"
            >
              privacy@pineapplechunks.studio
            </a>
            . We may need to verify your identity before fulfilling your request.
          </p>
        </div>
      ),
    },
    {
      title: '10. Security measures',
      content: (
        <div className="space-y-3 text-zinc-200">
          <p>We implement appropriate technical and organisational measures to protect personal data:</p>
          <ul className="list-disc space-y-2 pl-6 text-sm md:text-base">
            <li>Encryption in transit – All communications with OINTment occur over HTTPS.</li>
            <li>
              Access controls – GitHub tokens are stored in secure cookies and are not persisted in
              our database. Only authorised personnel have access to production systems.
            </li>
            <li>
              Data minimisation – We truncate code and document text to the first 10,000 characters
              and limit the number of files sent to AI models. This reduces the amount of personal
              data exposed.
            </li>
            <li>
              Logging and monitoring – We log errors and unusual activities to detect and respond to
              potential security incidents.
            </li>
          </ul>
          <p>No system can guarantee absolute security, but we take steps to protect your data.</p>
        </div>
      ),
    },
    {
      title: '11. Children’s privacy',
      content: (
        <p className="text-zinc-200">
          OINTment is intended for professional and academic users. We do not knowingly collect
          personal data from children under 16. If we become aware that we have collected data from
          a child, we will delete it promptly.
        </p>
      ),
    },
    {
      title: '12. Changes to this policy',
      content: (
        <p className="text-zinc-200">
          We may update this privacy policy to reflect changes to our practices or legal
          obligations. We will notify you of any material changes by posting the updated policy with
          a new effective date. We encourage you to review this policy regularly.
        </p>
      ),
    },
    {
      title: '13. Contact us',
      content: (
        <div className="text-zinc-200">
          <p>
            If you have any questions about this privacy policy or our data practices, please contact
            us at:
          </p>
          <p className="mt-3 font-medium">Pineapple-Chunks Studio</p>
          <p>Email: <a href="mailto:privacy@pineapplechunks.studio" className="text-cyan-300 underline decoration-dotted">privacy@pineapplechunks.studio</a></p>
          <p className="mt-4">
            Data Protection Authority – You also have the right to lodge a complaint with your local
            supervisory authority. In Thailand, you may contact the Personal Data Protection
            Committee (PDPC), and in the EEA you may contact your local data protection authority.
          </p>
        </div>
      ),
    },
    {
      title: '14. Technical reference: how to verify these commitments',
      content: (
        <div className="space-y-3 text-zinc-200">
          <ul className="list-disc space-y-2 pl-6 text-sm md:text-base">
            <li>
              <strong>Repository ingest & truncation –</strong> /api/ingest receives uploaded ZIPs or
              GitHub archives, truncates each file/doc to 10,000 characters, and forwards only the
              file list plus docs to the LLM analyzers.
            </li>
            <li>
              <strong>Commit metadata processing –</strong> /api/github/commits fetches commit SHAs,
              statuses, and messages, classifies them through categorizeCommits/jitterOffsets, and
              caches them locally for the 3D map.
            </li>
            <li>
              <strong>Mission Control/OINT –</strong> /api/oint/create, /api/oint/summary, and
              /api/oint/apply use an in-memory state.ts module to reuse the submitted docs/files for a
              single dashboard session.
            </li>
            <li>
              <strong>Client-side caches –</strong> Pages such as /ingest, /matrix, /3d-map, /vibe-killer,
              /roaster, and /toolset set and read localStorage keys (ingestResult, trackingData, repo,
              branch, vibeResult, ointData, etc.) purely within your browser.
            </li>
            <li>
              <strong>Third-party lookups –</strong> /api/components queries the npm registry for package
              metadata and returns Clearbit logo URLs, while never exposing your GitHub tokens to
              those services.
            </li>
          </ul>
        </div>
      ),
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
      <HexBackground className="hex-fade" reveal={false} />
      <div className="relative z-10 px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <header className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Privacy & Compliance</p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Privacy Policy for OINTment</h1>
            <p className="mt-3 text-sm text-zinc-400">Last updated: 16 September 2025</p>
          </header>

          <div className="grid gap-6">
            {sections.map((section) => (
              <section key={section.title} className={sectionClass}>
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                <div className="mt-4 text-sm leading-relaxed text-zinc-300 md:text-base">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
