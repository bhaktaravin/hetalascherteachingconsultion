/** Public EmailJS IDs (safe to expose in the browser). */
export function isEmailJsConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim() &&
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim() &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim(),
  );
}

export function getEmailJsConfig(): { publicKey: string; serviceId: string; templateId: string } {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim() ?? "";
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim() ?? "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim() ?? "";
  return { publicKey, serviceId, templateId };
}
