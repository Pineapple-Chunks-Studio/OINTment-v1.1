# Privacy Policy for OINTment

_Last updated: 16 September 2025_

## 1. Introduction
OINTment is a web-based application that helps developers and teams understand and improve their software projects by ingesting source code and documents, mapping dependencies and commit history, and producing AI-generated analyses. This privacy policy explains how OINTment (referred to as “we” or “us”) collects, uses, shares, and protects your personal data when you use the application. It also describes your rights under the EU General Data Protection Regulation (GDPR).

## 2. Who is the data controller?
The data controller is the entity that determines the purposes and means of the processing of personal data. OINTment is currently operated by **Pineapple-Chunks Studio** (contact email: `privacy@pineapplechunks.studio`). If the operation of the app changes or if a partner organisation is designated as the controller, we will update this notice accordingly.

## 3. Personal data we collect and why
### 3.1 Data you provide directly
- **Repository details** – When you submit a repository URL (e.g. `owner/repo`) or upload a ZIP archive via the `/ingest` endpoint, the form data includes the repository name and branch, or your uploaded file. We use this data to fetch your code from GitHub or to read your uploaded archive. The ingest route checks the repo and branch parameters and obtains a ZIP file from GitHub or from your upload.
- **Documentation** – You may upload project documentation (e.g. PRD, design estimates) alongside code. These files are read, converted to text, and truncated to the first 10,000 characters. We store only the extracted text, file names, and the type of document, as provided in the `docs_meta` form field.
- **GitHub authentication token** – If you authorize OINTment to access a private repository, a GitHub personal access token is included either in the request header (`x-github-token`) or as a `github_token` cookie. We do not store your token beyond the duration of your session; it is kept in a secure cookie and used only to fetch repository content.

### 3.2 Data we collect automatically
- **Repository file list and code snippets** – During ingestion, the application downloads the repository ZIP file, extracts the list of file names, and loads the contents of each file (truncated to 10,000 characters). This data is necessary to build dependency graphs, run AI analyses, and provide visualisations.
- **Commit metadata** – To create the 3D commit map and to classify commits, OINTment may fetch commit hashes, authors, timestamps, commit messages, and changed paths from GitHub. Commit messages and metadata are passed to AI models for classification and jitter calculation.
- **Analysis results** – AI-generated summaries, code reviews (“roasts”), fix suggestions, and AI-artifact detection results are returned from the AI provider and stored in the app to display to you.
- **Cookies and session data** – We use cookies to manage your session and authentication. The `github_token` cookie stores your GitHub access token so that requests to GitHub can be authenticated. Additional session cookies may be used to maintain state and to implement CSRF protection. These cookies are essential to the operation of the app and do not track you for advertising purposes.
- **Local device caches** – To make repeat visits faster, we store your latest ingest result, repository selection, commit-map payloads (SHA, message, status and offsets), Vibe Killer results and Mission Control dashboards in your browser’s `localStorage`. These caches remain on your device, are never transmitted back to us, and can be cleared at any time from the UI or via your browser settings.

### 3.3 Data from third parties
- **GitHub** – When you provide a repository URL, we request metadata (e.g. default branch) and download the repository archive from GitHub’s `codeload` domain. This may include commit history and contributor information that contains names and email addresses. This data is used solely to perform the requested analyses.
- **OpenAI/AIML API** – To generate summaries, reviews, and classifications, we send portions of your repository file list, documentation, commit messages, and code snippets to an AI API operated by OpenAI or an alternative AI provider, as configured in the environment variables. The AI provider processes this data to return the requested analysis.

### 3.4 Ephemeral orchestration data
- **OINT creation state** – When you launch the Mission Control/OINT workflow, we keep the uploaded documents, repository file list and sampled code snippets in an in-memory store on the server while the dashboard is assembled. This cache is discarded once the response is returned and is never written to disk.

## 4. How we use your personal data
We process personal data to:
- **Provide and improve the service** – We ingest your repository, parse files and documentation, fetch commit history, and display dependency graphs, matrices, and commit maps while generating AI-assisted summaries and recommendations.
- **Authenticate requests** – We use your GitHub token to authenticate API calls and to access private repositories.
- **Generate analyses using AI** – We send file lists, code snippets, and commit data to AI models to generate summaries, code reviews, fix suggestions, and AI-artifact detection results.
- **Communicate with you** – We may use your contact information (if provided separately) to send service-related announcements or to respond to your enquiries.
- **Ensure security and prevent misuse** – We log certain actions (e.g. ingestion requests, authentication errors) to detect abuse, debug issues, and improve stability.
- **Run the OINT dashboard** – The `/api/oint` endpoints reuse the in-memory document/code snapshot captured during creation so that we can populate the Mission Control view without re-uploading your materials.

We do not use your personal data for advertising or marketing purposes.

## 5. Legal basis for processing
We rely on the following legal bases under the GDPR:
- **Consent (Article 6(1)(a))** – By uploading code or providing a repository URL and a GitHub token, you consent to our processing of that data for the purposes described in this policy. You may withdraw your consent at any time by stopping use of the app and clearing the `github_token` cookie. This will not affect processing that took place before your withdrawal.
- **Legitimate interests (Article 6(1)(f))** – We have a legitimate interest in analysing code and commit history to provide insights to our users, to ensure the security of the platform, and to improve our services. When we rely on this basis, we assess whether our interests are overridden by your fundamental rights and freedoms.
- **Contract performance (Article 6(1)(b))** – If we enter into a contract with you (e.g. a paid subscription or enterprise agreement), we process personal data to perform that contract.

## 6. How we share your data
We may share your personal data with the following categories of recipients:
- **AI service providers** – We send content extracted from your repository (file lists, documentation, code snippets, commit messages, and metadata) to AI models hosted by OpenAI or other providers to obtain summaries and analyses. These providers act as data processors on our behalf and are contractually bound to use your data only to provide the requested analysis.
- **Hosting and infrastructure providers** – OINTment is hosted on cloud infrastructure. These providers may process logs and metadata to deliver the service securely and reliably.
- **GitHub** – When you provide a repository URL or token, we request repository archives, commit histories, and related metadata from GitHub’s APIs. GitHub is a separate data controller for the content of repositories.
- **Dependency metadata & logos** – When you open the Architecture Matrix, we query the public npm registry for the dependency names extracted from your repository and display Clearbit-hosted logos for those domains. Both services receive only package identifiers, never your authentication tokens.
- **Legal or regulatory authorities** – We may disclose personal data if required by law, regulation, legal process, or to protect the rights, property, or safety of OINTment or others.

We do not sell your personal data to third parties.

## 7. International transfers
The AI providers and hosting services we use may be located outside of the European Economic Area (EEA). When personal data is transferred to a country that does not have an adequacy decision from the European Commission, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) or another lawful transfer mechanism. A copy of these safeguards can be provided upon request.

## 8. Data retention
We retain your personal data only for as long as necessary to fulfil the purposes described above. Specifically:
- Uploaded archives and extracted code snippets are processed in memory and are not stored beyond the current session unless you explicitly save the analysis. Temporary buffers are cleared when the response is returned.
- Analysis results (e.g. summaries, roasts, suggestions) may be kept in your session for convenience. If you have an account, we may retain these results until you delete the project or your account.
- Logs containing IP addresses, timestamps, and error messages are kept for up to 90 days for security and debugging and then deleted or anonymised.
- If you withdraw consent or request deletion, we will remove your data unless retention is required by law or needed to protect our legal claims.
- Client-side caches (e.g. `localStorage`) stay on your device until you clear them from the UI or your browser. In-memory orchestration data that powers the OINT dashboard is automatically dropped after each request.

## 9. Your rights under the GDPR
Subject to certain conditions, you have the following rights:
- **Right of access** – You can request confirmation that we process your personal data and obtain a copy of that data.
- **Right to rectification** – You can ask us to correct inaccurate or incomplete personal data.
- **Right to erasure (“right to be forgotten”)** – You can request deletion of your personal data if it is no longer needed, if you withdraw consent, or if processing is unlawful.
- **Right to restrict processing** – You can request that we restrict processing of your data if you contest its accuracy, the processing is unlawful, or you need it for legal claims.
- **Right to data portability** – You can request that we provide your data in a structured, commonly used, machine-readable format and, where technically feasible, transmit it to another controller.
- **Right to object** – You can object to processing based on legitimate interests on grounds relating to your particular situation. We will cease processing unless we can demonstrate compelling legitimate grounds.
- **Right to withdraw consent** – Where we rely on consent, you may withdraw it at any time.
- **Right not to be subject to automated decision-making** – We do not use your data to make decisions that produce legal or similarly significant effects without human involvement.

To exercise any of these rights, please contact us at `privacy@pineapplechunks.studio`. We may need to verify your identity before fulfilling your request.

## 10. Security measures
We implement appropriate technical and organisational measures to protect personal data, including:
- **Encryption in transit** – All communications with OINTment (including ingestion and API calls) occur over HTTPS.
- **Access controls** – GitHub tokens are stored in secure cookies and are not persisted in our database. Only authorised personnel have access to production systems.
- **Data minimisation** – We truncate code and document text to the first 10,000 characters and limit the number of files sent to AI models. This reduces the amount of personal data exposed.
- **Logging and monitoring** – We log errors and unusual activities to detect and respond to potential security incidents.

No system can guarantee absolute security, but we take steps to protect your personal data from loss, misuse, and unauthorised access.

## 11. Children’s privacy
OINTment is intended for professional and academic users. We do not knowingly collect personal data from children under 16. If we become aware that we have collected data from a child, we will delete it promptly.

## 12. Changes to this policy
We may update this privacy policy to reflect changes to our practices or legal obligations. We will notify you of any material changes by posting the updated policy with a new effective date. We encourage you to review this policy regularly.

## 13. Contact us
If you have any questions about this privacy policy or our data practices, please contact us at:

**Pineapple-Chunks Studio**  
Email: `privacy@pineapplechunks.studio`

Data Protection Authority – You also have the right to lodge a complaint with your local supervisory authority. In Thailand, you may contact the Personal Data Protection Committee (PDPC), and in the EEA you may contact your local data protection authority.

## 14. Technical reference: how to verify these commitments
- **Repository ingest & truncation** – `/api/ingest` receives uploaded ZIPs or GitHub archives, truncates each file/doc to 10,000 characters, and forwards only the file list plus docs to the LLM analyzers.
- **Commit metadata processing** – `/api/github/commits` fetches commit SHAs, statuses and messages, classifies them through `categorizeCommits`/`jitterOffsets`, and caches them locally for the 3D map.
- **Mission Control/OINT** – `/api/oint/create`, `/api/oint/summary`, and `/api/oint/apply` use an in-memory `state.ts` module to reuse the submitted docs/files for a single dashboard session.
- **Client-side caches** – Pages such as `/ingest`, `/matrix`, `/3d-map`, `/vibe-killer`, `/roaster`, and `/toolset` set and read `localStorage` keys (`ingestResult`, `trackingData`, `repo`, `branch`, `vibeResult`, `ointData`, etc.) purely within your browser.
- **Third-party lookups** – `/api/components` queries the npm registry for package metadata and returns Clearbit logo URLs, while never exposing your GitHub tokens to those services.
