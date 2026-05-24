import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api.js' 
import { toast } from 'sonner'
import styles from './Plan.module.css'

/* ── Feature options with pricing impact ── */
const FEATURES = [
    { id: 'ai', label: 'AI Chatbot', desc: '24/7 smart auto-replies', price: 4999, icon: <img src='/icons/ai-chat.png' alt='ai-chat' width="35" /> },
    { id: 'rag', label: 'RAG Knowledge Base', desc: 'Train AI on your business docs', price: 3999, icon: <img src='/icons/rag.png' alt='RAG Knowledge' width="35" /> },
    { id: 'bulk', label: 'Bulk Messaging', desc: 'Broadcast to 1000+ contacts', price: 2999, icon: <img src='/icons/bulk.png' alt='bulk-mesaage' width="35" /> },
    { id: 'followup', label: 'Auto Follow-up', desc: 'Drip sequences & reminders', price: 1999, icon: <img src='/icons/followups.png' alt='followups' width="35" /> },
    { id: 'dashboard', label: 'Live Dashboard', desc: 'Analytics & performance data', price: 1499, icon: <img src='/icons/dashboard.png' alt='dashboard' width="35" /> },
]

const INDUSTRIES = ['Real Estate', 'Education', 'Healthcare', 'E-Commerce', 'Finance', 'Hospitality', 'Retail', 'Manufacturing', 'Other']

const PLAN_BASE = {
    starter: { label: 'Starter', base: 9999, employees: 2, color: '#00e5ff' },
    growth: { label: 'Growth', base: 19999, employees: 5, color: '#06ffa5' },
    enterprise: { label: 'Enterprise', base: 29999, employees: 20, color: '#7c3aed' },
}

const STEPS = [
    { id: 'business', label: 'Business Info', icon: <img src='/icons/business.png' alt='business' width="20" /> },
    { id: 'plan', label: 'Choose Plan', icon: <img src='/icons/plan.png' alt='plan' width="20" /> },
    { id: 'features', label: 'Features', icon: <img src='/icons/features.png' alt='features' width="20" /> },
    { id: 'team', label: 'Team & API', icon: <img src='/icons/team.png' alt='team' width="20" /> },
    { id: 'ai', label: 'AI Setup', icon: <img src='/icons/ai.png' alt='AI' width="20" /> },
    { id: 'review', label: 'Review', icon: <img src='/icons/review.png' alt='review' width="20" /> },
]

/* ─────────────────────────────────────────── */
export default function Plan() {
    const [step, setStep] = useState(0)
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    /* Form state */
    const [form, setForm] = useState({
        owner_name: '', business_name: '', email: '', phone: '',
        industry: '', address: '', business_description: '',
        plan_type: 'growth',
        whatsapp_number: '', whatsapp_api_key: '', openai_api_key: '',
        features_selected: [],
        employees: [{ name: '', email: '' }],
        system_prompt: '',
        questions: '',
        rag_enabled: false,
    })

    const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
    const setCheck = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.checked }))

    /* Feature toggle */
    const toggleFeature = (id) => {
        setForm(f => {
            const has = f.features_selected.includes(id)
            const next = has ? f.features_selected.filter(x => x !== id) : [...f.features_selected, id]
            const ragEnabled = next.includes('rag')
            return { ...f, features_selected: next, rag_enabled: ragEnabled }
        })
    }

    /* Employee helpers */
    const addEmployee = () => setForm(f => ({ ...f, employees: [...f.employees, { name: '', email: '' }] }))
    const removeEmployee = (i) => setForm(f => ({ ...f, employees: f.employees.filter((_, idx) => idx !== i) }))
    const setEmployee = (i, k) => (e) => setForm(f => {
        const emp = [...f.employees]; emp[i] = { ...emp[i], [k]: e.target.value }
        return { ...f, employees: emp }
    })

    /* Price calc */
    const featureTotal = form.features_selected.reduce((sum, id) => {
        const f = FEATURES.find(x => x.id === id); return sum + (f ? f.price : 0)
    }, 0)
    const basePlanPrice = PLAN_BASE[form.plan_type].base
    const total = basePlanPrice + featureTotal

    const validateStep = () => {
        const e = {}
        if (step === 0) {
            if (!form.owner_name.trim()) e.owner_name = 'required'
            if (!form.business_name.trim()) e.business_name = 'required'
            if (!form.email.trim()) e.email = 'required'
            if (!form.phone.trim()) e.phone = 'required'
            if (!form.industry) e.industry = 'Please select'
        }
        if (step === 3) {
            if (!form.whatsapp_number.trim()) e.whatsapp_number = 'required'
            if (!form.whatsapp_api_key.trim()) e.whatsapp_api_key = 'required'
        }
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const submit = async () => {
        setLoading(true)
        const payload = {
            email: form.email,
            raw_data: {},
            business_name: form.business_name,
            owner_name: form.owner_name,
            phone: form.phone,
            plan_type: form.plan_type,
            whatsapp_api_key: form.whatsapp_api_key,
            whatsapp_number: form.whatsapp_number,
            openai_api_key: form.openai_api_key,
            industry: form.industry,
            employees: form.employees.filter(e => e.name && e.email),
            features_selected: form.features_selected,
            system_prompt: form.system_prompt,
            questions: form.questions,
            rag_enabled: form.rag_enabled,
            business_description: form.business_description,
            address: form.address,
        }
        try {
            await api.post('/plan', payload)
            toast.success('Plan submitted successfully!')
        setSubmitted(true)
        } catch (err) {
        toast.error(err.response?.data?.message || 'Submission failed. Please try again.')
    } finally {
        setLoading(false)
    }
    }

    if (submitted) return <SuccessScreen name={form.owner_name} plan={form.plan_type} total={total} />

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.bg}><div className={styles.orb} /><div className={styles.grid} /></div>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className="tag">⚡ Get Started</div>
                        <h1 className={styles.title}>Build Your <span className="gradient-text">Automation Plan</span></h1>
                        <p className={styles.sub}>Configure a custom WhatsApp automation system. Pick your features, see live pricing.</p>
                    </div>
                </div>
            </section>

            {/* Main Form Area */}
            <section className={styles.formSection}>
                <div className="container">
                    <div className={styles.layout}>

                        {/* Stepper sidebar */}
                        <aside className={styles.sidebar}>
                            <div className={styles.stepperCard}>
                                {STEPS.map((s, i) => (
                                    <div
                                        key={s.id}
                                        className={`${styles.stepItem} ${i === step ? styles.stepActive : ''} ${i < step ? styles.stepDone : ''}`}
                                        onClick={() => i < step && setStep(i)}
                                    >
                                        <div className={styles.stepBullet}>
                                            {i < step ? <img src='/icons/checked.png' alt='results' width="35" /> : <span>{s.icon}</span>}
                                        </div>
                                        <div className={styles.stepLabel}>{s.label}</div>
                                        {i < STEPS.length - 1 && <div className={styles.stepLine} />}
                                    </div>
                                ))}
                            </div>

                            {/* Price Box */}
                            <div className={styles.priceBox}>
                                <div className={styles.priceLabel}>Estimated Price</div>
                                <div className={styles.priceMain}>₹{total.toLocaleString('en-IN')}</div>
                                <div className={styles.priceBreakdown}>
                                    <div className={styles.priceRow}>
                                        <span>{PLAN_BASE[form.plan_type].label} Plan</span>
                                        <span>₹{basePlanPrice.toLocaleString('en-IN')}</span>
                                    </div>
                                    {form.features_selected.map(id => {
                                        const f = FEATURES.find(x => x.id === id)
                                        return f ? (
                                            <div key={id} className={styles.priceRow}>
                                                <span>{f.label}</span>
                                                <span className={styles.priceAdd}>+₹{f.price.toLocaleString('en-IN')}</span>
                                            </div>
                                        ) : null
                                    })}
                                </div>
                                <div className={styles.priceNote}>One-time setup fee</div>
                            </div>
                        </aside>

                        {/* Form panel */}
                        <div className={styles.formPanel}>
                            <div className={styles.formCard}>
                                <StepContent
                                    step={step}
                                    form={form}
                                    set={set}
                                    setCheck={setCheck}
                                    toggleFeature={toggleFeature}
                                    addEmployee={addEmployee}
                                    removeEmployee={removeEmployee}
                                    setEmployee={setEmployee}
                                    total={total}
                                    errors={errors}
                                />
                                <div className={styles.formNav}>
                                    {step > 0 && (
                                        <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}>← Back</button>
                                    )}
                                    {step < STEPS.length - 1 ? (
                                        <button
                                            className="btn btn-primary"
                                            style={{ marginLeft: 'auto' }}
                                            onClick={() => {
                                                if (validateStep()) setStep(s => s + 1)
                                            }}
                                        >
                                            Continue →
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-primary"
                                            style={{ marginLeft: 'auto', minWidth: 180 }}
                                            onClick={() => {
                                                if (validateStep()) submit()
                                            }}
                                            disabled={loading}
                                        >
                                            {loading ? 'Submitting…' : 'Submit →'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function StepContent({ step, form, set, setCheck, toggleFeature, addEmployee, removeEmployee, setEmployee, total, errors }) {
    switch (step) {
        case 0: return <StepBusiness form={form} set={set} errors={errors} />
        case 1: return <StepPlan form={form} set={set} />
        case 2: return <StepFeatures form={form} toggleFeature={toggleFeature} />
        case 3: return <StepTeam form={form} set={set} addEmployee={addEmployee} removeEmployee={removeEmployee} setEmployee={setEmployee} errors={errors} />
        case 4: return <StepAI form={form} set={set} setCheck={setCheck} />
        case 5: return <StepReview form={form} total={total} />
        default: return null
    }
}

function StepBusiness({ form, set, errors }) {
    return (
        <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Tell us about your business</h2>
            <p className={styles.stepSub}>We'll use this to configure your automation system.</p>
            <div className={styles.grid2}>
                <Field label="Owner Name *">
                    <input className={styles.inp} placeholder="Abhishek Sharma" value={form.owner_name} onChange={set('owner_name')} />
                    {errors.owner_name && <span className={styles.err}>{errors.owner_name}</span>}
                </Field>
                <Field label="Business Name *">
                    <input className={styles.inp} placeholder="Velta English Academy" value={form.business_name} onChange={set('business_name')} />
                    {errors.business_name && <span className={styles.err}>{errors.business_name}</span>}
                </Field>
                <Field label="Email *">
                    <input className={styles.inp} type="email" placeholder="you@business.com" value={form.email} onChange={set('email')} />
                    {errors.email && <span className={styles.err}>{errors.email}</span>}
                </Field>
                <Field label="Phone *">
                    <input className={styles.inp} type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
                    {errors.phone && <span className={styles.err}>{errors.phone}</span>}
                </Field>
                <Field label="Industry *">
                    <select className={styles.inp} value={form.industry} onChange={set('industry')}>
                        <option value="">Select industry…</option>
                        {INDUSTRIES.map(i => (
                            <option key={i} value={i.toLowerCase()}>{i}</option>
                        ))}
                    </select>
                    {errors.industry && <span className={styles.err}>{errors.industry}</span>}
                </Field>
                <Field label="City / Address">
                    <input className={styles.inp} placeholder="Pune, Maharashtra" value={form.address} onChange={set('address')} />
                </Field>
            </div>
            <Field label="Business Description">
                <textarea className={styles.inp} rows={3} placeholder="What does your business do? Who are your customers?" value={form.business_description} onChange={set('business_description')} />
            </Field>
        </div>
    )
}

/* ─── Step 1: Plan Selection ─── */
function StepPlan({ form, set }) {
    const plans = [
        { id: 'starter', name: 'Starter', price: 9999, employees: '2 Agents', highlight: false, perks: ['WhatsApp Automation', 'Lead Capture', 'Basic CRM', '2 Team Members'] },
        { id: 'growth', name: 'Growth', price: 19999, employees: '5 Agents', highlight: true, perks: ['Everything in Starter', 'AI Chatbot Ready', '5 Team Members', 'Priority Support'] },
        { id: 'enterprise', name: 'Enterprise', price: 29999, employees: '20 Agents', highlight: false, perks: ['Everything in Growth', 'Custom Integrations', '20 Team Members', 'Dedicated Manager'] },
    ]
    return (
        <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Choose your plan</h2>
            <p className={styles.stepSub}>Base price. Add features in the next step.</p>
            <div className={styles.planGrid}>
                {plans.map(p => (
                    <div
                        key={p.id}
                        className={`${styles.planCard} ${form.plan_type === p.id ? styles.planCardActive : ''} ${p.highlight ? styles.planHighlight : ''}`}
                        onClick={() => set('plan_type')({ target: { value: p.id } })}
                    >
                        {p.highlight && <div className={styles.popularBadge}>Most Popular</div>}
                        <div className={styles.planName}>{p.name}</div>
                        <div className={styles.planPrice}>₹{p.price.toLocaleString('en-IN')}</div>
                        <div className={styles.planSub}>one-time setup</div>
                        <div className={styles.planEmployees}>{p.employees}</div>
                        <ul className={styles.planPerks}>
                            {p.perks.map(perk => <li key={perk}><span>✓</span>{perk}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Step 2: Features ─── */
function StepFeatures({ form, toggleFeature }) {
    return (
        <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Select features</h2>
            <p className={styles.stepSub}>Each feature adds to your setup cost. Pick what you need.</p>
            <div className={styles.featGrid}>
                {FEATURES.map(f => {
                    const active = form.features_selected.includes(f.id)
                    return (
                        <div
                            key={f.id}
                            className={`${styles.featCard} ${active ? styles.featCardActive : ''}`}
                            onClick={() => toggleFeature(f.id)}
                        >
                            <div className={styles.featCheck}>{active ? '✓' : ''}</div>
                            <div className={styles.featIcon}>{f.icon}</div>
                            <div className={styles.featName}>{f.label}</div>
                            <div className={styles.featDesc}>{f.desc}</div>
                            <div className={styles.featPrice}>+₹{f.price.toLocaleString('en-IN')}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

/* ─── Step 3: Team & API ─── */
function StepTeam({ form, set, addEmployee, removeEmployee, setEmployee, errors }) {
    return (
        <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Team members & API keys</h2>
            <p className={styles.stepSub}>Add your sales team and connect WhatsApp API.</p>

            <div className={styles.grid2}>
                <Field label="WhatsApp Business Number *">
                    <input className={styles.inp} placeholder="919876543210" value={form.whatsapp_number} onChange={set('whatsapp_number')} />
                    {errors.whatsapp_number && <span className={styles.err}>{errors.whatsapp_number}</span>}
                </Field>
                <Field label="WhatsApp API Key *">
                    <input className={styles.inp} type="password" placeholder="wa-api-key…" value={form.whatsapp_api_key} onChange={set('whatsapp_api_key')} />
                    {errors.whatsapp_api_key && <span className={styles.err}>{errors.whatsapp_api_key}</span>}
                </Field>
            </div>

            <div className={styles.teamSection}>
                <div className={styles.teamHeader}>
                    <span className={styles.teamTitle}>Team Members</span>
                    <button type="button" className={styles.addBtn} onClick={addEmployee}>+ Add Member</button>
                </div>
                {form.employees.map((emp, i) => (
                    <div key={i} className={styles.empRow}>
                        <input className={styles.inp} placeholder="Name" value={emp.name} onChange={setEmployee(i, 'name')} />
                        <input className={styles.inp} placeholder="Email" value={emp.email} onChange={setEmployee(i, 'email')} />
                        {form.employees.length > 1 && (
                            <button className={styles.removeBtn} onClick={() => removeEmployee(i)}>✕</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Step 4: AI Setup ─── */
function StepAI({ form, set, setCheck }) {
    return (
        <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Configure your AI</h2>
            <p className={styles.stepSub}>Customize how the AI talks to your customers.</p>

            <Field label="OpenAI API Key">
                <input className={styles.inp} type="password" placeholder="sk-…" value={form.openai_api_key} onChange={set('openai_api_key')} />
            </Field>
            <Field label="AI System Prompt">
                <textarea
                    className={styles.inp} rows={4}
                    placeholder="E.g. Talk like a friendly mentor and guide students to join demo classes"
                    value={form.system_prompt} onChange={set('system_prompt')}
                />
            </Field>
            <Field label="Questions to Ask Leads">
                <textarea
                    className={styles.inp} rows={3}
                    placeholder="E.g. goal, budget, preferred timing, start date"
                    value={form.questions} onChange={set('questions')}
                />
            </Field>
            {form.features_selected.includes('rag') && (
                <div className={styles.toggleRow}>
                    <label className={styles.toggle}>
                        <input type="checkbox" checked={form.rag_enabled} onChange={setCheck('rag_enabled')} />
                        <span className={styles.toggleSlider} />
                    </label>
                    <div>
                        <div className={styles.toggleLabel}>Enable RAG Knowledge Base</div>
                        <div className={styles.toggleSub}>Let AI learn from your documents, PDFs and FAQs</div>
                    </div>
                </div>
            )}
        </div>
    )
}

/* ─── Step 5: Review ─── */
function StepReview({ form, total }) {
    const planInfo = PLAN_BASE[form.plan_type]
    const selectedFeatures = FEATURES.filter(f => form.features_selected.includes(f.id))
    return (
        <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Review your order</h2>
            <p className={styles.stepSub}>Everything look good? Submit to lock in your plan.</p>

            <div className={styles.reviewGrid}>
                <ReviewBlock title="Business">
                    <ReviewRow label="Name" val={form.business_name || '—'} />
                    <ReviewRow label="Owner" val={form.owner_name || '—'} />
                    <ReviewRow label="Email" val={form.email || '—'} />
                    <ReviewRow label="Phone" val={form.phone || '—'} />
                    <ReviewRow label="Industry" val={form.industry || '—'} />
                </ReviewBlock>
                <ReviewBlock title="Plan">
                    <ReviewRow label="Plan" val={planInfo.label} />
                    <ReviewRow label="Base Price" val={`₹${planInfo.base.toLocaleString('en-IN')}`} />
                    <ReviewRow label="Features" val={selectedFeatures.length > 0 ? selectedFeatures.map(f => f.label).join(', ') : 'None'} />
                    <ReviewRow label="Team Size" val={form.employees.filter(e => e.name).length + ' members'} />
                </ReviewBlock>
                <ReviewBlock title="AI Config">
                    <ReviewRow label="RAG Enabled" val={form.rag_enabled ? 'Yes' : 'No'} />
                    <ReviewRow label="Questions" val={form.questions || '—'} />
                    <ReviewRow label="API Keys" val={form.openai_api_key ? 'Provided ✓' : 'Not provided'} />
                </ReviewBlock>
            </div>

            <div className={styles.totalBox}>
                <span>Total Setup Cost</span>
                <span className={styles.totalAmt}>₹{total.toLocaleString('en-IN')}</span>
            </div>
        </div>
    )
}

function ReviewBlock({ title, children }) {
    return (
        <div className={styles.reviewBlock}>
            <div className={styles.reviewBlockTitle}>{title}</div>
            {children}
        </div>
    )
}

function ReviewRow({ label, val }) {
    return (
        <div className={styles.reviewRow}>
            <span className={styles.reviewLabel}>{label}</span>
            <span className={styles.reviewVal}>{val}</span>
        </div>
    )
}

/* ─── Success screen ─── */
function SuccessScreen({ name, plan, total }) {
    return (
        <div className={styles.successPage}>
            <div className={styles.successCard}>
                <div className={styles.successOrb} />
                <div className={styles.successIcon}>🎉</div>
                <h2>You're all set, {name?.split(' ')[0] || 'there'}!</h2>
                <p>Your <strong>{PLAN_BASE[plan]?.label}</strong> plan has been submitted. Our team will reach out within 2 hours to begin setup.</p>
                <div className={styles.successDetail}>
                    <span>Total</span>
                    <span className={styles.successAmt}>₹{total.toLocaleString('en-IN')}</span>
                </div>
                <Link to="/contact" className="btn btn-primary" style={{ marginTop: 8 }}>Talk to Us →</Link>
                <Link to="/" className="btn btn-outline" style={{ marginTop: 8 }}>Back to Home</Link>
            </div>
        </div>
    )
}

/* ─── Field wrapper ─── */
function Field({ label, children }) {
    return (
        <div className={styles.field}>
            <label className={styles.label}>{label}</label>
            {children}
        </div>
    )
}