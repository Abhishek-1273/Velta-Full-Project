import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import api from '../../api/api.js'
import styles from './Plan.module.css'

const plans = [
    {
        id: 'Starter',
        name: 'Starter',
        price: '₹999',
        sub: 'per month',
        employees: 'Up to 5 members',
        perks: ['WhatsApp integration', 'Basic AI assistant', 'Email support'],
    },
    {
        id: 'Pro',
        name: 'Pro',
        price: '₹2,999',
        sub: 'per month',
        employees: 'Up to 20 members',
        perks: ['Everything in Starter', 'RAG knowledge base', 'Priority support'],
        popular: true,
    },
    {
        id: 'Enterprise',
        name: 'Enterprise',
        price: 'Custom',
        sub: 'contact us',
        employees: 'Unlimited members',
        perks: ['Everything in Pro', 'Dedicated manager', 'Custom integrations'],
    },
]

const termsSections = [
    {
        id: 'tos', label: 'Terms of Service', number: '01',
        clauses: [
            { title: '1. Acceptance of Terms', content: <p>By accessing or using WhatsFlow, you agree to these Terms of Service. If you do not agree, please do not use WhatsFlow.</p> },
            { title: '2. About WhatsFlow', content: <p>WhatsFlow is a WhatsApp automation and lead management product. It provides software, automation workflows, and integrations to help you manage leads and conversations from WhatsApp. WhatsFlow is a technology product only — it does not provide sales, marketing, or business advisory services.</p> },
            { title: '3. No Guarantee of Results', content: <p>WhatsFlow makes no guarantee, express or implied, regarding revenue, sales, leads, conversions, or ROI. Business outcomes depend entirely on your own efforts, market conditions, and use of the product.</p> },
            { title: '4. Your Responsibilities', content: (<><p>You are solely responsible for:</p><ul><li>Compliance with WhatsApp, Meta, and all third-party platform policies.</li><li>Maintaining valid licenses and accounts for all third-party tools used with WhatsFlow.</li><li>All content, messaging, and data processed through WhatsFlow.</li><li>Paying all third-party charges (WhatsApp, API, SMS, email, AI, hosting, etc.).</li></ul></>) },
            { title: '5. Third-Party Services', content: <p>WhatsFlow integrates with third-party providers including WhatsApp, Meta, Evolution API, AppSheet, Google services, AI providers, hosting providers, SMS providers, and email providers. WhatsFlow is not responsible for outages, policy changes, pricing changes, account bans, suspensions, or restrictions imposed by any third-party provider.</p> },
            { title: '6. Limitation of Liability', content: <p>To the maximum extent permitted by law, WhatsFlow shall not be liable for lost profits, lost revenue, business interruption, indirect or consequential damages, or any losses arising from third-party service failures. Total liability is limited to the fees paid for WhatsFlow in the three (3) months preceding the claim.</p> },
            { title: '7. Termination', content: <p>Either party may terminate WhatsFlow services with 30 days written notice. Upon termination, server-side automations and hosted services will be discontinued. You may request a data export before termination where technically feasible.</p> },
            { title: '8. Governing Law', content: <p>These Terms are governed by the laws of India. Any disputes shall be resolved through good-faith negotiation, or if unresolved, through appropriate courts of competent jurisdiction.</p> },
        ],
    },
    {
        id: 'privacy', label: 'Privacy Policy', number: '02',
        clauses: [
            { title: '1. Introduction', content: <p>This Privacy Policy explains how WhatsFlow collects, uses, and protects information when you use the product.</p> },
            { title: '2. Information We Collect', content: (<><p>WhatsFlow may collect:</p><ul><li>Account information: name, email address, company name, billing details.</li><li>Usage data: logs, configurations, and activity related to your WhatsFlow account.</li><li>Business data: lead records, contact information, and messages processed through WhatsFlow on your behalf.</li></ul></>) },
            { title: '3. How We Use Your Information', content: (<><p>We use collected information only for:</p><ul><li>Providing, maintaining, and improving WhatsFlow.</li><li>Processing payments and managing your account.</li><li>Sending service-related communications and support.</li><li>Complying with legal obligations.</li></ul><p>We do not sell your data. We do not use your data for advertising.</p></>) },
            { title: '4. Data Sharing', content: <p>We may share data with trusted third-party providers (e.g., hosting, payment processors) strictly to deliver WhatsFlow. All such providers are bound by confidentiality obligations. We do not share your data with unrelated third parties.</p> },
            { title: '5. Data Security', content: <p>WhatsFlow implements industry-standard technical and organisational measures to protect your data. However, no system is fully secure, and we cannot guarantee absolute data security.</p> },
            { title: '6. Data Retention', content: <p>We retain your data for as long as your WhatsFlow account is active or as required by law. Upon termination, data will be securely deleted or anonymised within 90 days, unless a longer period is required by law.</p> },
            { title: '7. Your Rights', content: <p>You have the right to access, correct, or request deletion of your personal data. To exercise these rights, contact WhatsFlow support.</p> },
            { title: '8. Cookies', content: <p>WhatsFlow may use cookies and similar technologies to improve user experience. You may disable cookies through your browser settings, though some features may not function correctly.</p> },
            { title: '9. Changes to This Policy', content: <p>We may update this Privacy Policy from time to time. Continued use of WhatsFlow after changes constitutes acceptance of the updated policy.</p> },
        ],
    },
    {
        id: 'refund', label: 'Refund & Cancellation', number: '03',
        clauses: [
            { title: '1. Overview', content: <p>This policy outlines how refunds and cancellations are handled for WhatsFlow. By purchasing WhatsFlow, you agree to this policy.</p> },
            { title: '2. Setup Fees — Non-Refundable', content: <p>All one-time setup, onboarding, and implementation fees are non-refundable once implementation has begun.</p> },
            { title: '3. Subscription Fees — Non-Refundable', content: <p>Monthly, quarterly, or annual subscription fees and maintenance retainers are non-refundable once the billing cycle has commenced, regardless of usage during that period.</p> },
            { title: '4. Cancellation Process', content: <p>To cancel your WhatsFlow subscription, provide written notice at least 30 days before the next billing date. Services continue until the end of the current paid period.</p> },
            { title: '5. Effect of Cancellation', content: (<><p>Upon cancellation or termination:</p><ul><li>Access to WhatsFlow will be disabled at the end of the current period.</li><li>Server-side automations, hosted workflows, and active integrations will be shut down.</li><li>You may request a data export before the termination date where technically feasible.</li><li>No partial refunds will be issued for unused days within a billing period.</li></ul></>) },
            { title: '6. Exceptional Circumstances', content: <p>Refunds may be considered at our sole discretion in cases of proven technical failure directly attributable to WhatsFlow (not third-party providers) that renders it completely unusable. Requests must be submitted in writing within 7 days.</p> },
            { title: '7. Third-Party Costs', content: <p>WhatsFlow cannot refund costs charged by third-party providers (WhatsApp, Meta, AppSheet, AI services, hosting, SMS, email, etc.). Resolve such billing matters directly with the respective providers.</p> },
            { title: '8. Non-Payment', content: <p>Late or unpaid invoices may result in immediate suspension of WhatsFlow services, including automations, integrations, dashboards, and support. Suspended periods are not refundable.</p> },
        ],
    },
    {
        id: 'billing', label: 'Payment & Billing', number: '04',
        clauses: [
            { title: '1. Billing Structure', content: (<><p>WhatsFlow charges under the following categories:</p><ul><li>One-time setup / onboarding fee.</li><li>Monthly / quarterly / annual subscription fee.</li><li>Maintenance and support retainer.</li><li>Additional or custom development, billed separately.</li></ul></>) },
            { title: '2. Invoicing', content: <p>Invoices are issued electronically. You are responsible for keeping your billing contact details accurate and up to date.</p> },
            { title: '3. Payment Terms', content: <p>All invoices are due within 3 days of the invoice date unless otherwise agreed in writing. Payment must be made via accepted methods confirmed at onboarding.</p> },
            { title: '4. Late Payments', content: (<><p>If an invoice remains unpaid beyond the due date:</p><ul><li>WhatsFlow services may be suspended immediately.</li><li>A late fee of 2% per month may be applied to the outstanding balance.</li><li>Services are reinstated only upon full payment.</li></ul></>) },
            { title: '5. Price Changes', content: <p>Pricing may be revised with 30 days advance written notice. Continued use of WhatsFlow after the effective date constitutes acceptance of the new pricing.</p> },
            { title: '6. Third-Party Charges', content: <p>You are responsible for all charges billed by third-party providers (WhatsApp API, Meta, AppSheet, AI providers, hosting, SMS, email). These are not included in WhatsFlow fees.</p> },
            { title: '7. Taxes', content: <p>All fees are exclusive of applicable taxes (including GST). You are responsible for all taxes applicable to your purchase of WhatsFlow.</p> },
        ],
    },
    {
        id: 'data', label: 'Data & Ownership', number: '05',
        clauses: [
            { title: '1. Overview', content: <p>This policy describes how WhatsFlow collects, processes, and handles your data, and clarifies ownership rights.</p> },
            { title: '2. Your Data Ownership', content: <p>You retain full and exclusive ownership of all business data entered into or processed through WhatsFlow, including lead records, contact lists, conversation data, and customer information.</p> },
            { title: '3. WhatsFlow as Data Processor', content: (<><p>WhatsFlow acts as a data processor on your behalf, processing your data solely to deliver the product, including:</p><ul><li>Operating and maintaining automations and workflows.</li><li>Generating reports and dashboards.</li><li>Enabling integrations you configure.</li></ul></>) },
            { title: '4. Data Storage & Security', content: <p>Your data is stored on secure servers with access controls, encryption in transit, and regular security reviews.</p> },
            { title: '5. Data Export', content: <p>You may request an export of your data at any time during the active service period. Requests are fulfilled within a reasonable timeframe where technically feasible.</p> },
            { title: '6. Data Deletion on Termination', content: <p>Upon termination, WhatsFlow will securely delete or anonymise your data within 90 days, unless a longer retention period is required by law.</p> },
            { title: '7. Compliance Responsibility', content: <p>You are responsible for ensuring your use of WhatsFlow complies with applicable data protection laws, including rules governing your customers' personal data.</p> },
            { title: '8. Data Breach Notification', content: <p>In the event of a confirmed data breach affecting your data, WhatsFlow will notify you promptly and take appropriate remedial action.</p> },
        ],
    },
]

const PlanSimple = () => {
    const [formData, setFormData] = useState({
        owner_name: '',
        business_name: '',
        email: '',
        phone: '',
        plan_type: 'Pro',
        agreed_to_terms: false,
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [showTerms, setShowTerms] = useState(false)
    const [activeTerm, setActiveTerm] = useState(0)


    const handleChange = (e) => {
        const { name, type, value, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    const selectPlan = (id) => {
        setFormData((prev) => ({ ...prev, plan_type: id }))
    }

    useEffect(() => {
        if (!showTerms) return
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = ''
        }
    }, [showTerms])

    const modalBodyRef = useRef(null)

    useEffect(() => {
        if (modalBodyRef.current) {
            modalBodyRef.current.scrollTop = 0
        }
    }, [activeTerm])
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})
        setLoading(true)
        try {
            const { data } = await api.post('/plan/create', {
                ...formData,
                raw_data: { timestamp: new Date().toISOString() },
            })
            setSuccess(true)
        } catch (err) {
            if (err.response) {
                setErrors(err.response.data?.errors || { general: err.userMessage })
            } else {
                setErrors({ general: err.userMessage || 'Network error. Please try again.' })
            }
            console.error('Submit error:', err)
        } finally {
            setLoading(false)
        }
    }

    const selectedPlan = plans.find((p) => p.id === formData.plan_type)

    if (success) {
        return (
            <div className={styles.successPage}>
                <div className={styles.successCard}>
                    <div className={styles.successOrb} />
                    <div className={styles.successIcon}>✓</div>
                    <h2>Plan Submitted Successfully!</h2>
                    <p>We&apos;ve received your details and will get back to you shortly.</p>
                    <div className={styles.successDetail}>
                        <span>Selected Plan</span>
                        <span className={styles.successAmt}>{selectedPlan?.name}</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.page}>

            {/* Form */}
            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.formCard}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.stepContent}>
                                <h2 className={styles.stepTitle}>Your Details</h2>
                                <p className={styles.stepSub}>Tell us a bit about you and your business.</p>

                                <div className={styles.grid2}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Owner Name</label>
                                        <input
                                            className={`${styles.inp} ${errors.owner_name ? styles.inpError : ''}`}
                                            type="text"
                                            name="owner_name"
                                            value={formData.owner_name}
                                            onChange={handleChange}
                                            placeholder="Your full name"
                                        />
                                        {errors.owner_name && <span className={styles.err}>{errors.owner_name}</span>}
                                    </div>

                                    <div className={styles.field}>
                                        <label className={styles.label}>Business Name</label>
                                        <input
                                            className={`${styles.inp} ${errors.business_name ? styles.inpError : ''}`}
                                            type="text"
                                            name="business_name"
                                            value={formData.business_name}
                                            onChange={handleChange}
                                            placeholder="Your business name"
                                        />
                                        {errors.business_name && <span className={styles.err}>{errors.business_name}</span>}
                                    </div>
                                </div>

                                <div className={styles.grid2}>
                                    <div className={styles.field}>
                                        <label className={styles.label}>Email</label>
                                        <input
                                            className={`${styles.inp} ${errors.email ? styles.inpError : ''}`}
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                        />
                                        {errors.email && <span className={styles.err}>{errors.email}</span>}
                                    </div>

                                    <div className={styles.field}>
                                        <label className={styles.label}>Phone</label>
                                        <input
                                            className={`${styles.inp} ${errors.phone ? styles.inpError : ''}`}
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                        />
                                        {errors.phone && <span className={styles.err}>{errors.phone}</span>}
                                    </div>
                                </div>

                                {/* Plan selection */}
                                <h2 className={styles.stepTitle} style={{ marginTop: 24 }}>Select Plan</h2>
                                <p className={styles.stepSub}>Pick the plan that fits your needs.</p>

                                <div className={styles.planGrid}>
                                    {plans.map((plan) => (
                                        <div
                                            key={plan.id}
                                            className={`${styles.planCard} ${formData.plan_type === plan.id ? styles.planCardActive : ''
                                                } ${plan.popular ? styles.planHighlight : ''}`}
                                            onClick={() => selectPlan(plan.id)}
                                        >
                                            {plan.popular && <span className={styles.popularBadge}>POPULAR</span>}
                                            <div className={styles.planName}>{plan.name}</div>
                                            <div className={styles.planPrice}>{plan.price}</div>
                                            <div className={styles.planSub}>{plan.sub}</div>
                                            <div className={styles.planEmployees}>{plan.employees}</div>
                                            <ul className={styles.planPerks}>
                                                {plan.perks.map((perk, i) => (
                                                    <li key={i}>
                                                        <span>✓</span> {perk}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                {/* Terms & Services checkbox */}
                                <div
                                    className={`${styles.checkboxGroup} ${errors.agreed_to_terms ? styles.checkboxGroupError : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        id="agreed_to_terms"
                                        name="agreed_to_terms"
                                        checked={formData.agreed_to_terms}
                                        onChange={handleChange}
                                        className={styles.checkboxInput}
                                    />
                                    <label htmlFor="agreed_to_terms" className={styles.checkboxLabel}>
                                        <span>I agree to the</span>

                                        <a href="#"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setShowTerms(true)
                                            }}
                                        >
                                            Terms &amp; Services
                                        </a>
                                    </label>
                                </div>
                                {errors.agreed_to_terms && (
                                    <span className={styles.err}>{errors.agreed_to_terms}</span>
                                )}

                                {errors.general && (
                                    <span className={styles.err} style={{ marginBottom: 16 }}>
                                        {errors.general}
                                    </span>
                                )}
                            </div>

                            {/* Nav / submit */}
                            <div className={styles.formNav}>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Submitting...' : 'Submit Plan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* ✅ Modal — form se bahar, portal se body pe mount */}
            {showTerms && createPortal(
                <div
                    className={styles.modalOverlay}
                    onClick={() => setShowTerms(false)}
                >
                    <div
                        className={styles.modalCard}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.modalHeader}>
                            <h2>Terms &amp; Services</h2>
                        </div>

                        {/* Tab bar — click a heading to switch sections, like the navbar */}
                        <div className={styles.termsTabs}>
                            {termsSections.map((sec, i) => (
                                <button
                                    key={sec.id}
                                    type="button"
                                    className={`${styles.termsTab} ${activeTerm === i ? styles.termsTabActive : ''}`}
                                    onClick={() => setActiveTerm(i)}
                                >
                                    <span className={styles.termsTabNum}>{sec.number}</span>
                                    {sec.label}
                                </button>
                            ))}
                        </div>

                        <div className={styles.modalBody} ref={modalBodyRef}>
                            <h3 style={{ color: 'var(--accent)' }}>{termsSections[activeTerm].label}</h3>
                            {termsSections[activeTerm].clauses.map((clause, i) => (
                                <div key={i}>
                                    <h3>{clause.title}</h3>
                                    {clause.content}
                                </div>
                            ))}

                            {/* Prev / Next */}
                            <div className={styles.termsNav}>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setActiveTerm((p) => Math.max(0, p - 1))}
                                    disabled={activeTerm === 0}
                                >
                                    ← Previous
                                </button>
                                <span className={styles.termsNavCount}>
                                    {activeTerm + 1} / {termsSections.length}
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setActiveTerm((p) => Math.min(termsSections.length - 1, p + 1))}
                                    disabled={activeTerm === termsSections.length - 1}
                                >
                                    Next →
                                </button>
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowTerms(false)}
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    setFormData((prev) => ({ ...prev, agreed_to_terms: true }))
                                    setShowTerms(false)
                                }}
                            >
                                I Agree
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    )
}

export default PlanSimple