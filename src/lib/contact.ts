import { EMAIL } from "@/content/profile";

export type ContactMessage = { name: string; email: string; type: string; message: string };
export type ContactResult = "sent" | "mailto";

export const mailtoHref = (msg: ContactMessage) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(`[${msg.type}] ${msg.name}`)}&body=${encodeURIComponent(`${msg.message}\n\n${msg.name} <${msg.email}>`)}`;

/**
 * Sends the contact form.
 * - With NEXT_PUBLIC_CONTACT_ENDPOINT set (a Formspree or serverless URL accepting
 *   JSON), the message is POSTed there. Resolves "sent"; throws if the request fails,
 *   so the form can show an error with a mail link as a fallback.
 * - Without it, the visitor's mail client opens with the message pre-filled
 *   and the function resolves "mailto".
 */
export async function submitContact(msg: ContactMessage): Promise<ContactResult> {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  if (!endpoint) {
    window.location.href = mailtoHref(msg);
    return "mailto";
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(msg),
  });
  if (!res.ok) throw new Error(`Contact endpoint answered ${res.status}`);
  return "sent";
}
