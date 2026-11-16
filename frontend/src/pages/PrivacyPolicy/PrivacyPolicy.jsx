import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './PrivacyPolicy.module.css'

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = 'Privacy Policy | VeltaZ — Digital Systems & Software'
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className={styles.page}>
      <div className={styles.ambientBlob} />
      <div className={styles.container}>
        <div className={styles.badge}>Security &amp; Transparency</div>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last Updated: November 2026</p>

        <article className={styles.contentCard}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Introduction</h2>
            <p className={styles.text}>
              At <strong>VeltaZ</strong> (accessible via <a href="https://www.veltalabs.net" className={styles.link}>veltalabs.net</a>), protecting your privacy and business confidentiality is fundamental to how we engineer digital software. This Privacy Policy outlines what information we collect, how it is safeguarded, and how it is used across our web platforms, bespoke software, and automation systems.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
            <p className={styles.text}>
              We collect information strictly necessary to provide consultation, software engineering, and customer support:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <span><strong>Contact &amp; Enquiry Details:</strong> When you submit a project enquiry through our contact form, we collect your full name, email address, company or business name, country, budget scope, and project description.</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <span><strong>AI Consultation Logs:</strong> Conversations conducted through our interactive VeltaZ AI assistant are processed securely to provide instant technical answers and route service requests.</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <span><strong>Technical &amp; Telemetry Data:</strong> Standard anonymous server logs including browser type, operating system, and IP address for security audits, DDoS mitigation, and Core Web Vitals optimization.</span>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>
            <p className={styles.text}>
              Your information is utilized solely for legitimate operational and engineering purposes:
            </p>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <span>Evaluating technical feasibility and preparing tailored architectural proposals.</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <span>Communicating milestones, project deliverables, and client support inquiries.</span>
              </li>
              <li className={styles.listItem}>
                <span className={styles.bullet}>•</span>
                <span>Maintaining uptime, system security, and preventing fraudulent submissions.</span>
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Client Confidentiality &amp; Code Protection</h2>
            <p className={styles.text}>
              We hold client confidentiality to the highest industry standards. All source code, proprietary business logic, schemas, and credentials shared with VeltaZ are governed by non-disclosure agreements (NDAs). We never sell, rent, or trade your data or project details to third-party data brokers or advertisers.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Cookies &amp; Local Storage</h2>
            <p className={styles.text}>
              We use lightweight browser local storage strictly to remember your UI preferences (such as Dark/Light theme mode). We do not deploy intrusive tracking cookies.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Third-Party Infrastructure</h2>
            <p className={styles.text}>
              Our infrastructure utilizes battle-tested, enterprise-grade cloud providers including Render (cloud hosting), MongoDB Atlas (secure encrypted database), and Cloudinary (media CDN). Each provider complies with stringent global data protection and encryption standards.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Your Rights</h2>
            <p className={styles.text}>
              You retain full rights to request access to your submitted contact records, request corrections, or ask for the permanent deletion of your project records from our systems at any time.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Contact Us</h2>
            <p className={styles.text}>
              For privacy-related inquiries, data requests, or security disclosures, please reach out to our team at{' '}
              <a href="mailto:support@veltalabs.net" className={styles.link}>support@veltalabs.net</a> or connect via our{' '}
              <Link to="/contact" className={styles.link}>Contact Page</Link>.
            </p>
          </section>
        </article>
      </div>
    </main>
  )
}
