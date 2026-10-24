/**
 * Interface text (navigation, buttons, form messages). Page copy lives in src/data.
 * To add Spanish later: copy this file to es.ts, translate every value, and add a
 * language switch only once Jacquelyn confirms she serves Spanish-speaking clients.
 */
export const ui = {
  nav: {
    home: 'Home',
    buy: 'Buy',
    sell: 'Sell',
    communities: 'Communities',
    about: 'About Jacquelyn',
    contact: 'Contact',
    cta: 'Let’s Talk',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
  },
  contactBar: { call: 'Call', text: 'Text', contact: 'Contact' },
  form: {
    required: 'Required',
    optional: 'optional',
    sending: 'Sending…',
    errors: {
      required: 'Please fill in this field.',
      email: 'Please enter a valid email address, like name@example.com.',
      phone: 'Please enter a 10-digit phone number, or leave this blank.',
      summary: 'Please fix the highlighted fields.',
      network: 'Your message couldn’t be sent. Please try again, or reach me directly:',
    },
    previewNotice: 'Preview form: not connected yet. Nothing you enter here is sent.',
    previewResult: 'Nothing was sent. This preview form isn’t connected yet. To reach me now:',
    successTitle: 'Thank you, your message was sent.',
    successBody: 'I’ll be in touch soon. If it’s urgent, please call or text me directly.',
    consent:
      'By submitting, you agree that Jacquelyn Guevara may contact you by phone, text, or email about your real estate questions. Consent is not a condition of any purchase. Message and data rates may apply. Reply STOP to opt out.',
  },
} as const;
