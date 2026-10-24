/**
 * Client-side behaviour for every <form data-lead-form>:
 *  - inline validation with accessible error messages
 *  - a "Sending…" state while the request is in flight
 *  - success shown only after the form service confirms receipt
 *  - a clear "nothing was sent" result when no endpoint is configured
 *  - UTM/gclid capture for attribution, and URL prefill (?interest=Selling&town=Brick)
 */
import { ui } from '@/i18n/en';

const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function fieldError(control: Control): string {
  const value = control.value.trim();
  if (control.required && !value) return ui.form.errors.required;
  if (control.type === 'email' && value && !EMAIL_RE.test(value)) return ui.form.errors.email;
  if (control.type === 'tel' && value && value.replace(/\D/g, '').replace(/^1/, '').length !== 10) return ui.form.errors.phone;
  return '';
}

function showFieldError(form: HTMLFormElement, control: Control, message: string) {
  const slot = form.querySelector<HTMLElement>(`[data-error-for="${control.name}"]`);
  control.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (slot) {
    slot.textContent = message;
    slot.classList.toggle('hidden', !message);
  }
}

function validate(form: HTMLFormElement): Control | null {
  let firstInvalid: Control | null = null;
  form.querySelectorAll<Control>('input:not([type=hidden]):not([name=company_website]), select, textarea').forEach((control) => {
    const message = fieldError(control);
    showFieldError(form, control, message);
    if (message && !firstInvalid) firstInvalid = control;
  });
  return firstInvalid;
}

function show(el: Element | null, visible = true) {
  el?.classList.toggle('hidden', !visible);
}

export function initLeadForms() {
  const attribution = captureAttribution();
  const params = new URLSearchParams(location.search);

  document.querySelectorAll<HTMLFormElement>('form[data-lead-form]').forEach((form) => {
    if (form.dataset.enhanced) return;
    form.dataset.enhanced = 'true';

    form.querySelectorAll<HTMLInputElement>('[data-attribution]').forEach((el) => (el.value = attribution));
    form.querySelectorAll<HTMLSelectElement>('select[data-prefill]').forEach((el) => {
      const v = params.get(el.dataset.prefill!);
      if (v && [...el.options].some((o) => o.value === v)) el.value = v;
    });

    // Re-check a field once the visitor has corrected it
    form.addEventListener('input', (e) => {
      const control = e.target as Control;
      if (control.getAttribute('aria-invalid') === 'true') showFieldError(form, control, fieldError(control));
    });

    const submit = form.querySelector<HTMLButtonElement>('[data-submit]');
    const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');
    const idleLabel = submitLabel?.textContent ?? '';
    const summary = form.querySelector('[data-error-summary]');
    const errorPanel = form.querySelector('[data-result="error"]');
    const previewPanel = form.querySelector<HTMLElement>('[data-result="preview"]');
    const successPanel = document.querySelector<HTMLElement>(`[data-success-for="${form.id}"]`);

    const startedAt = performance.now();
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      show(errorPanel, false);
      show(previewPanel, false);

      const invalid = validate(form);
      show(summary, Boolean(invalid));
      if (invalid) {
        invalid.focus();
        return;
      }

      const data = new FormData(form);
      if (data.get('company_website')) return; // bot honeypot
      data.delete('company_website');

      const endpoint = form.dataset.endpoint;
      if (!endpoint) {
        // Preview: never pretend the message was sent.
        show(previewPanel);
        previewPanel?.focus();
        return;
      }

      // Bots tend to submit instantly. A person who is this fast just sees the retry message.
      if (performance.now() - startedAt < 2000) {
        show(errorPanel);
        return;
      }

      submit?.setAttribute('disabled', '');
      form.setAttribute('aria-busy', 'true');
      if (submitLabel) submitLabel.textContent = ui.form.sending;
      try {
        const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const w = window as unknown as { gtag?: (...args: unknown[]) => void };
        w.gtag?.('event', 'generate_lead', { form_type: data.get('form_type') });
        form.hidden = true;
        show(successPanel);
        successPanel?.focus();
      } catch {
        show(errorPanel);
      } finally {
        submit?.removeAttribute('disabled');
        form.removeAttribute('aria-busy');
        if (submitLabel) submitLabel.textContent = idleLabel;
      }
    });
  });
}
