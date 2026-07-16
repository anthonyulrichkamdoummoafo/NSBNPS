import emailjs from '@emailjs/browser';

// Vite requires the VITE_ prefix for client-exposed env vars. The public key is
// designed to be exposed client-side (that's how EmailJS works for static
// sites with no backend) -- it identifies your account, it isn't a secret that
// grants write access to anything sensitive.
const SERVICE_ID = (import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined) || '';
const PUBLIC_KEY = (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined) || '';
const ADMISSIONS_TEMPLATE_ID =
  (import.meta.env.VITE_EMAILJS_ADMISSIONS_TEMPLATE_ID as string | undefined) || '';
const CONTACT_TEMPLATE_ID =
  (import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID as string | undefined) || '';

export const isEmailConfigured = (): boolean =>
  Boolean(SERVICE_ID && PUBLIC_KEY && ADMISSIONS_TEMPLATE_ID && CONTACT_TEMPLATE_ID);

export class EmailNotConfiguredError extends Error {
  constructor() {
    super('EmailJS is not configured (missing VITE_EMAILJS_* env vars).');
    this.name = 'EmailNotConfiguredError';
  }
}

async function send(templateId: string, params: Record<string, unknown>): Promise<void> {
  if (!isEmailConfigured()) throw new EmailNotConfiguredError();
  await emailjs.send(SERVICE_ID, templateId, params, { publicKey: PUBLIC_KEY });
}

export function sendAdmissionsApplication(params: {
  student_name: string;
  target_grade: string;
  parent_name: string;
  phone: string;
  email: string;
  additional_info: string;
}): Promise<void> {
  return send(ADMISSIONS_TEMPLATE_ID, params);
}

export function sendContactMessage(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  return send(CONTACT_TEMPLATE_ID, params);
}
