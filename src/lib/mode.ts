/**
 * Preview vs production content.
 *
 * PUBLIC_SITE_MODE=preview (the default) shows clearly labeled sample content and
 * "awaiting content" notes so the design can be reviewed. PUBLIC_SITE_MODE=production
 * hides every sample and placeholder; sections without real content disappear.
 */
export const isPreview = (import.meta.env.PUBLIC_SITE_MODE || 'preview') !== 'production';

/** Lead form endpoint (Formspree, Basin, a CRM webhook, …). Empty = forms are preview-only. */
export const formEndpoint: string = import.meta.env.PUBLIC_FORM_ENDPOINT || '';
