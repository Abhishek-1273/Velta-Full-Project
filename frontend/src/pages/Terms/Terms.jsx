import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Terms.module.css'

export default function Terms() {
  useEffect(() => {
    document.title = 'Terms of Service | VeltaZ — Digital Systems & Software'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className={styles.page}>
      <div className={styles.ambientBlob} />
      <div className={styles.container}>
        <div className={styles.badge}>Legal Framework</div>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last Updated: November 2026</p>

        <article className={styles.contentCard}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Agreement to Terms</h2>
            <p className={styles.text}>
              By accessing, browsing, or utilizing the web properties, digital products, and engineering services offered by <strong>VeltaZ</strong> (accessible at <a href="https://www.veltalabs.net" className={styles.link}>veltalabs.net</a>), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Scope of Services</h2>
            <p className={styles.text}>
              VeltaZ provides bespoke software engineering, modern web platform development, mobile application engineering, digital automation systems, search engine optimization (SEO), and performance marketing services. Specific project engagements, deliverables, milestones, and timelines are executed pursuant to individual project agreements or Statements of Work (SOW).
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Client Engagements &amp; Deliverables</h2>
            <p className={styles.text}>
              For every custom client project:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <span><strong>Scope Boundaries:</strong> Deliverables are strictly defined within the agreed-upon Statement of Work. Additional features or scope expansions will be evaluated under separate change requests.</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <span><strong>Client Cooperation:</strong> Timely delivery depends on the prompt provision of required assets, design inputs, and technical credentials.</span>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Intellectual Property Rights</h2>
            <p className={styles.text}>
              We maintain rigorous standards regarding intellectual property ownership:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <span><strong>VeltaZ Core Intellectual Property:</strong> All pre-existing frameworks, proprietary component libraries, internal architectures, algorithms, backend boilerplates, and the source code of the VeltaZ agency platform remain the exclusive intellectual property of VeltaZ.</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <span><strong>Client Deliverables:</strong> Upon complete settlement of agreed fees, client-specific bespoke assets and custom project codebases developed specifically for the client are licensed or transferred according to the governing SOW.</span>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Warranties &amp; Limitation of Liability</h2>
            <p className={styles.text}>
              Our platforms and software services are delivered according to modern software engineering best practices. VeltaZ provides reasonable bug-fix warranty periods post-deployment as detailed in client contracts. To the maximum extent permitted by law, VeltaZ shall not be liable for indirect, incidental, or consequential damages resulting from third-party outages, API changes, or unauthorized modifications.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Governing Law</h2>
            <p className={styles.text}>
              These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the applicable laws of India, subject to the jurisdiction of courts in Pune, Maharashtra.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Modifications to Terms</h2>
            <p className={styles.text}>
              VeltaZ reserves the right to review and revise these Terms periodically to reflect evolving technology standards and statutory requirements. Continued use of our site and services constitutes acceptance of revised terms.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Contact Information</h2>
            <p className={styles.text}>
              If you have any questions or require contractual clarifications regarding these Terms, please reach us at{' '}
              <a href="mailto:support@veltalabs.net" className={styles.link}>support@veltalabs.net</a> or visit our{' '}
              <Link to="/contact" className={styles.link}>Contact Page</Link>.
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
