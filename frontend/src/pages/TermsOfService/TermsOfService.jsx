import React, { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './TermsOfService.css'

const sections = [
    {
        id: 'tos', label: 'Terms of Service', number: '01',
        clauses: [
            { title: '1. Acceptance of Terms', content: (<p>By accessing or using VeltaZ's services, you agree to these Terms of Service with VeltaZ AI. If you do not agree, please do not use our services.</p>) },
            { title: '2. Description of Service', content: (<p>VeltaZ AI is a revenue operations and lead management platform. VeltaZ AI provides software, automation workflows, and integration services only. We are a technology service provider — we do not provide sales, marketing, or business advisory services.</p>) },
            { title: '3. No Guarantee of Results', content: (<p>VeltaZ AI makes no guarantee, express or implied, regarding revenue, sales, leads, conversions, or return on investment (ROI). Business outcomes depend entirely on the Client's own efforts, market conditions, and use of the platform.</p>) },
            { title: '4. Client Responsibilities', content: (<><p>The Client is solely responsible for:</p><ul><li>Compliance with WhatsApp, Meta, and all third-party platform policies.</li><li>Maintaining valid licenses and accounts for all third-party tools used.</li><li>All content, messaging, and data processed through the platform.</li><li>Paying all third-party charges (WhatsApp, API, SMS, email, AI, hosting, etc.).</li></ul></>) },
            { title: '5. Third-Party Services', content: (<p>VeltaZ AI integrates with third-party providers including WhatsApp, Meta, Evolution API, AppSheet, Google services, AI providers, hosting providers, SMS providers, and email providers. VeltaZ AI is not responsible for outages, policy changes, pricing changes, account bans, suspensions, or restrictions imposed by any third-party provider.</p>) },
            { title: '6. Limitation of Liability', content: (<p>To the maximum extent permitted by law, VeltaZ AI shall not be liable for lost profits, lost revenue, business interruption, indirect or consequential damages, or any losses arising from third-party service failures. Our total liability is limited to the fees paid by the Client in the three (3) months preceding the claim.</p>) },
            { title: '7. Termination', content: (<p>Either party may terminate services with 30 days written notice. Upon termination, server-side automations and hosted services will be discontinued. Clients may request a data export before termination where technically feasible.</p>) },
            { title: '8. Governing Law', content: (<p>These Terms are governed by the laws of India. Any disputes shall be resolved through good-faith negotiation, or if unresolved, through appropriate courts of competent jurisdiction.</p>) },
        ],
    },
    {
        id: 'privacy', label: 'Privacy Policy', number: '02',
        clauses: [
            { title: '1. Introduction', content: (<p>VeltaZ AI ("we", "our") respects the privacy of our clients and their customers. This Privacy Policy explains how we collect, use, and protect information when you use VeltaZ's services.</p>) },
            { title: '2. Information We Collect', content: (<><p>We may collect the following types of information:</p><ul><li>Account information: name, email address, company name, billing details.</li><li>Service usage data: logs, configurations, and activity related to your VeltaZ account.</li><li>Client business data: lead records, contact information, and messages processed through the platform on your behalf.</li></ul></>) },
            { title: '3. How We Use Your Information', content: (<><p>We use collected information only for:</p><ul><li>Providing, maintaining, and improving the Service.</li><li>Processing payments and managing your account.</li><li>Sending service-related communications and support.</li><li>Complying with legal obligations.</li></ul><p>We do not sell your data to third parties. We do not use your data for advertising purposes.</p></>) },
            { title: '4. Data Sharing', content: (<p>We may share data with trusted third-party service providers (e.g., hosting, payment processors) strictly to deliver the Service. All such providers are bound by confidentiality obligations. We do not share your data with unrelated third parties.</p>) },
            { title: '5. Data Security', content: (<p>We implement industry-standard technical and organisational measures to protect your data. However, no system is fully secure, and we cannot guarantee absolute data security.</p>) },
            { title: '6. Data Retention', content: (<p>We retain your data for as long as your account is active or as required by law. Upon account termination, we will securely delete or anonymise your data within 90 days, unless a longer retention period is required by law.</p>) },
            { title: '7. Your Rights', content: (<p>You have the right to access, correct, or request deletion of your personal data. To exercise these rights, contact us at support@veltalabs.net.</p>) },
            { title: '8. Cookies', content: (<p>Our platform may use cookies and similar tracking technologies to improve user experience. You may disable cookies through your browser settings, though some features may not function correctly.</p>) },
            { title: '9. Changes to This Policy', content: (<p>We may update this Privacy Policy from time to time. Continued use of the Service after changes constitutes acceptance of the updated policy.</p>) },
        ],
    },
    {
        id: 'csa', label: 'Client Service Agreement', number: '03',
        clauses: [
            { title: '1. Parties', content: (<p>This Client Service Agreement is entered into between VeltaZ AI ("Service Provider") and the Client as identified during onboarding ("Client").</p>) },
            { title: '2. Scope of Services', content: (<><p>VeltaZ AI agrees to provide the following under the agreed service plan:</p><ul><li>Access to the VeltaZ platform and its automation features.</li><li>Setup and configuration of workflows, integrations, and dashboards as per the agreed scope.</li><li>Technical support as defined in the selected service tier.</li><li>Ongoing maintenance and updates to the platform.</li></ul><p>Any services outside the agreed scope will be subject to a separate written change order and additional fees.</p></>) },
            { title: '3. Client Obligations', content: (<><p>The Client agrees to:</p><ul><li>Provide accurate information, credentials, and access required for setup.</li><li>Comply with WhatsApp, Meta, and all applicable third-party platform policies.</li><li>Pay all invoices on time as per the agreed payment schedule.</li><li>Not misuse the platform for spam, illegal activity, or policy violations.</li></ul></>) },
            { title: '4. Third-Party Charges', content: (<p>The Client acknowledges and accepts responsibility for all third-party charges arising from use of the platform, including but not limited to: WhatsApp messaging fees, Meta API costs, AppSheet licenses, AI provider usage, hosting fees, SMS costs, and email delivery costs. These charges are separate from VeltaZ AI fees.</p>) },
            { title: '5. Service Availability', content: (<p>VeltaZ AI will use commercially reasonable efforts to maintain service uptime. However, we cannot guarantee uninterrupted service due to third-party dependencies, scheduled maintenance, or factors beyond our control.</p>) },
            { title: '6. Intellectual Property', content: (<p>All platform software, workflows, templates, and tools developed by VeltaZ AI remain the intellectual property of VeltaZ AI. The Client retains full ownership of their business data and content.</p>) },
            { title: '7. Confidentiality', content: (<p>Both parties agree to keep confidential any proprietary or sensitive information shared during the course of this Agreement and not to disclose it to any third party without prior written consent.</p>) },
            { title: '8. Duration & Termination', content: (<p>This Agreement begins on the service start date and continues until terminated by either party with 30 days written notice, or immediately in the event of material breach, non-payment, or policy violation.</p>) },
        ],
    },
    {
        id: 'refund', label: 'Refund & Cancellation', number: '04',
        clauses: [
            { title: '1. Overview', content: (<p>This policy outlines the terms under which refunds and cancellations are handled for all VeltaZ services. By purchasing our services, you agree to this policy.</p>) },
            { title: '2. Setup Fees — Non-Refundable', content: (<p>All one-time setup fees, onboarding fees, and implementation fees are strictly non-refundable once implementation has begun. This covers the time, resources, and technical work invested in configuring your VeltaZ environment.</p>) },
            { title: '3. Subscription & Maintenance Fees — Non-Refundable', content: (<p>Monthly, quarterly, or annual subscription fees and maintenance retainers are non-refundable once the billing cycle has commenced. This applies regardless of the extent of platform use during that period.</p>) },
            { title: '4. Cancellation Process', content: (<p>To cancel your subscription, the Client must provide written notice to VeltaZ AI at least 30 days before the next billing date. Cancellation requests should be sent to the VeltaZ team. Services will continue until the end of the current paid period.</p>) },
            { title: '5. Effect of Cancellation', content: (<><p>Upon cancellation or termination:</p><ul><li>Access to the VeltaZ platform will be disabled at the end of the current period.</li><li>Server-side automations, hosted workflows, and active integrations will be shut down.</li><li>Clients may request a data export before the termination date where technically feasible.</li><li>No partial refunds will be issued for unused days within a billing period.</li></ul></>) },
            { title: '6. Exceptional Circumstances', content: (<p>Refunds may be considered at VeltaZ AI's sole discretion in cases of proven technical failure directly attributable to VeltaZ AI (not third-party providers) that renders the Service completely unusable. Any such request must be submitted in writing within 7 days of the issue.</p>) },
            { title: '7. Third-Party Costs', content: (<p>VeltaZ AI does not control and cannot refund costs charged by third-party providers (WhatsApp, Meta, AppSheet, AI services, hosting, SMS, email providers, etc.). Clients must resolve such billing matters directly with the respective providers.</p>) },
            { title: '8. Service Suspension Due to Non-Payment', content: (<p>Late or unpaid invoices may result in immediate suspension of services, including automations, integrations, reports, dashboards, and support. Suspended services will not result in a refund for the suspension period.</p>) },
        ],
    },
    {
        id: 'billing', label: 'Payment & Billing', number: '05',
        clauses: [
            { title: '1. Billing Structure', content: (<><p>VeltaZ AI charges for services under the following categories:</p><ul><li>One-time setup / onboarding fee: charged before or at the start of implementation.</li><li>Monthly / quarterly / annual subscription fee: billed as per the agreed plan.</li><li>Maintenance and support retainer: billed monthly or quarterly as applicable.</li><li>Additional or custom development: billed separately per written agreement.</li></ul></>) },
            { title: '2. Invoicing', content: (<p>Invoices are issued electronically and manually via email or phone calls. Clients are responsible for ensuring their billing contact details are accurate and up to date. Invoices are deemed received on the day they are sent.</p>) },
            { title: '3. Payment Terms', content: (<p>All invoices are due within 3 days of the invoice date, unless otherwise agreed in writing. Payment must be made via the accepted methods: bank transfer, UPI, or other methods confirmed at onboarding.</p>) },
            { title: '4. Late Payments', content: (<><p>If an invoice remains unpaid beyond the due date:</p><ul><li>VeltaZ AI reserves the right to suspend all services immediately, including platform access, automations, reports, integrations, and technical support.</li><li>A late payment fee of 2% per month may be applied to the outstanding balance.</li><li>Services will be reinstated only upon full payment of all outstanding amounts.</li></ul></>) },
            { title: '5. Price Changes', content: (<p>VeltaZ AI reserves the right to revise service pricing with 30 days advance written notice to the Client. Continued use of the Service after the effective date of a price change constitutes acceptance of the new pricing.</p>) },
            { title: '6. Third-Party Charges', content: (<p>Clients are solely responsible for paying all charges billed by third-party providers including WhatsApp API, Meta, AppSheet, AI providers, hosting services, SMS gateways, and email platforms. These costs are not included in VeltaZ AI's fees and are billed directly by the respective providers.</p>) },
            { title: '7. Disputed Invoices', content: (<p>If a Client believes an invoice is incorrect, they must notify VeltaZ AI in writing within 5 days of receiving the invoice. Undisputed portions of the invoice must be paid by the due date. Both parties will work in good faith to resolve billing disputes promptly.</p>) },
            { title: '8. Taxes', content: (<p>All fees are exclusive of applicable taxes (including GST or other applicable statutory taxes). The Client is responsible for all taxes applicable to their purchase of services.</p>) },
        ],
    },
    {
        id: 'data', label: 'Data & Ownership', number: '06',
        clauses: [
            { title: '1. Overview', content: (<p>This policy describes how VeltaZ AI collects, processes, and handles Client data in connection with the VeltaZ platform, and clarifies the ownership rights of all parties.</p>) },
            { title: '2. Client Data Ownership', content: (<p>The Client retains full and exclusive ownership of all business data entered into or processed through the VeltaZ platform. This includes, but is not limited to: lead records, contact lists, conversation data, sales pipeline information, and customer information. VeltaZ AI claims no ownership over Client data.</p>) },
            { title: '3. VeltaZ AI\'s Role as Data Processor', content: (<><p>VeltaZ AI acts as a data processor on behalf of the Client. We process Client data solely for the purpose of delivering the agreed services, including:</p><ul><li>Operating and maintaining platform automations and workflows.</li><li>Generating reports and dashboards based on Client data.</li><li>Enabling integrations with third-party tools as configured by the Client.</li></ul><p>We do not use Client data for any purpose beyond service delivery.</p></>) },
            { title: '4. Data Storage & Security', content: (<p>Client data is stored on secure servers with appropriate technical and organisational safeguards. VeltaZ AI employs access controls, encryption in transit, and regular security reviews to protect Client data from unauthorised access.</p>) },
            { title: '5. Third-Party Data Processing', content: (<p>Some data may be processed by third-party sub-processors including cloud hosting providers, AI service providers, and integration partners. These sub-processors are bound by data protection obligations and are used only as necessary to deliver the Service.</p>) },
            { title: '6. Data Export', content: (<p>Clients may request an export of their data at any time during the active service period. Export requests must be made in writing and will be fulfilled within a reasonable timeframe where technically feasible. Data export formats will depend on the nature of the data.</p>) },
            { title: '7. Data Deletion on Termination', content: (<p>Upon termination or expiry of the service, VeltaZ AI will securely delete or anonymise all Client data within 90 days, unless a longer retention period is required by applicable law. The Client should ensure they have exported all necessary data before termination.</p>) },
            { title: '8. Compliance Responsibility', content: (<p>The Client is responsible for ensuring their use of the VeltaZ platform complies with applicable data protection laws, including rules governing the collection and use of personal data belonging to their customers. VeltaZ AI is not responsible for the Client's compliance with data protection obligations in their own jurisdiction or industry.</p>) },
            { title: '9. Data Breach Notification', content: (<p>In the event of a confirmed data breach affecting Client data, VeltaZ AI will notify the Client promptly and take appropriate remedial action. Clients should also notify their customers as required by applicable law.</p>) },
        ],
    },
]

const TermsOfService = () => {
    const location = useLocation()
    const getInitialSection = () => {
        if (location.pathname === '/privacy' || location.pathname.includes('privacy')) {
            return 1
        }
        return 0
    }
    const [activeSection, setActiveSection] = useState(getInitialSection)
    const contentRef = useRef(null)

    const goTo = (index) => {
        setActiveSection(index)
        contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const current = sections[activeSection]

    return (
        <div className="terms-container">
            {/* Header */}
            <div className="terms-header">
                <Link to="/" className="back-link">← Back to Home</Link>
                <h1>Legal & Policy Documents</h1>
                <p>Version 1.0 | Effective 1 July 2026 | VeltaZ AI — WhatsFlow</p>
            </div>

            <div className="terms-layout">
                {/* Sidebar */}
                <aside className="terms-sidebar">
                    <p className="sidebar-heading">Documents</p>
                    {sections.map((sec, i) => (
                        <button
                            key={sec.id}
                            className={`sidebar-item ${activeSection === i ? 'sidebar-item-active' : ''}`}
                            onClick={() => goTo(i)}
                        >
                            <span className="sidebar-num">{sec.number}</span>
                            <span className="sidebar-label">{sec.label}</span>
                        </button>
                    ))}
                </aside>

                {/* Content */}
                <div className="terms-body" ref={contentRef}>
                    <div className="terms-doc-header">
                        <span className="doc-number">{current.number}</span>
                        <div>
                            <h2 className="doc-title">{current.label}</h2>
                            <p className="doc-meta">Effective Date: 1 July 2026 | VeltaZ AI — WhatsFlow</p>
                        </div>
                    </div>

                    {current.clauses.map((clause, i) => (
                        <section className="terms-section" key={i}>
                            <h2>{clause.title}</h2>
                            {clause.content}
                        </section>
                    ))}

                    {/* Prev / Next nav */}
                    <div className="terms-nav">
                        <button
                            className="terms-nav-btn"
                            onClick={() => goTo(activeSection - 1)}
                            disabled={activeSection === 0}
                        >
                            ← Previous
                        </button>
                        <span className="terms-nav-count">
                            {activeSection + 1} / {sections.length}
                        </span>
                        <button
                            className="terms-nav-btn"
                            onClick={() => goTo(activeSection + 1)}
                            disabled={activeSection === sections.length - 1}
                        >
                            Next →
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="terms-footer">
                <p className="footer-copy">© 2026 VeltaZ AI. All rights reserved. | www.veltalabs.net</p>
                <Link to="/demo" className="back-to-form">Go back to Plan Form</Link>
            </div>
        </div>
    )
}

export default TermsOfService