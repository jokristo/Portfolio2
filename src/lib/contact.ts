import { EMAIL } from "./content";

export type ContactMessage = { name: string; email: string; type: string; message: string };

/**
 * Sends the contact form. If NEXT_PUBLIC_CONTACT_ENDPOINT is set (e.g. a Formspree
 * or serverless endpoint accepting JSON), the message is POSTed there. Otherwise, or
 * if the request fails, the visitor's mail client opens with the message pre-filled.
 */
export async function submitContact(msg: ContactMessage): Promise<void> {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(msg),
      });
      if (res.ok) return;
    } catch {
      // fall through to mailto
    }
  }
  const subject = `[${msg.type}] ${msg.name}`;
  const body = `${msg.message}\n\n— ${msg.name} <${msg.email}>`;
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
