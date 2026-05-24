/**
 * Fire-and-forget n8n webhook call.
 * Never throws — a webhook failure must never break the main response.
 *
 * @param {string} url      - Webhook URL from env
 * @param {object} payload  - JSON body to send
 */
export const sendToWebhook = async (url, payload) => {
    if (!url) {
        console.warn('⚠️  sendToWebhook called without a URL — skipping');
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(5000),  // requires Node 18+
        });

        if (!response.ok) {
            console.warn(`⚠️  Webhook responded with HTTP ${response.status} — ${url}`);
        } else {
            console.log(`✅ Webhook notified — ${url}`);
        }
    } catch (err) {
        // Log but never propagate — webhook is always secondary
        console.error(`❌ Webhook failed (non-critical) — ${url} — ${err.message}`);
    }
};
