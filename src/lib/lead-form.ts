/**
 * Client-side enhancement for every <form data-lead-form>.
 * - Captures UTM/gclid params (persisted for the session) for attribution
 * - Prefills fields from the URL (?interest=selling&town=Brick)
 * - Submits via fetch to the configured endpoint or Netlify Forms
 * - Fires a `generate_lead` analytics event, then redirects to /thank-you/
 */
const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];

function captureAttribution(): string {
  const params = new URLSearchParams(location.search);
  const found = ATTRIBUTION_KEYS.filter((k) => params.has(k)).map((k) => `${k}=${params.get(k)}`);
  try {
    if (found.length) sessionStorage.setItem('lbh_attribution', found.join('&'));
    return sessionStorage.getItem('lbh_attribution') ?? '';
  } catch {
    return found.join('&');
  }
}

export function initLeadForms() {
  const attribution = captureAttribution();
  const params = new URLSearchParams(location.search);

  document.querySelectorAll<HTMLFormElement>('form[data-lead-form]').forEach((form) => {
    if (form.dataset.enhanced) return;
    form.dataset.enhanced = 'true';

    form.querySelectorAll<HTMLInputElement>('[data-utm]').forEach((el) => (el.value = attribution));
    form.querySelectorAll<HTMLSelectElement>('[data-prefill]').forEach((el) => {
      const v = params.get(el.dataset.prefill!);
      if (v && [...el.options].some((o) => (o.value || o.text) === v)) el.value = v;
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const button = form.querySelector<HTMLButtonElement>('button[type=submit]');
      const error = form.querySelector<HTMLElement>('[data-form-error]');
      const data = new FormData(form);
      if (data.get('company_website')) return; // bot

      button?.setAttribute('disabled', 'true');
      error?.classList.add('hidden');

      const endpoint = form.dataset.endpoint;
      try {
        const res = endpoint
          ? await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          : await fetch('/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
            });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const w = window as unknown as { gtag?: (...args: unknown[]) => void };
        w.gtag?.('event', 'generate_lead', { lead_type: data.get('lead_type'), town: data.get('town') ?? '' });
        location.href = `/thank-you/?type=${encodeURIComponent(String(data.get('lead_type') ?? ''))}`;
      } catch {
        error?.classList.remove('hidden');
        button?.removeAttribute('disabled');
      }
    });
  });
}
