import { contactForm, industries, offer, site } from "@/lib/version2-content";

/** What the Palette3 contact form and chat both collect. */
export const emptyEnquiry = { industry: "", help: "", challenge: "", name: "", email: "", company: "" };
export type Enquiry = typeof emptyEnquiry;

export const industryOptions = [...industries.items.map(({ title }) => title), contactForm.otherIndustry];
export const helpOptions = [...offer.items.map(({ title }) => title.replace(/\.$/, "")), contactForm.notSure];

/** Window event that opens the chat from elsewhere on the page. */
export const openChatEvent = "open-contact-chat";

export function enquiryMessage({ industry, help, challenge, name, email, company }: Enquiry) {
  return [
    industry && `Industry: ${industry}`,
    help && `Looking for: ${help}`,
    `\n${challenge.trim()}\n`,
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    company.trim() && `Company: ${company.trim()}`,
  ].filter(Boolean).join("\n");
}

function enquirySubject({ industry }: Enquiry) {
  return industry ? `${contactForm.subject}: ${industry}` : contactForm.subject;
}

export function enquiryMailto(enquiry: Enquiry) {
  return `mailto:${site.email}?subject=${encodeURIComponent(enquirySubject(enquiry))}&body=${encodeURIComponent(enquiryMessage(enquiry))}`;
}

export function enquiryClipboard(enquiry: Enquiry) {
  return `To: ${site.email}\nSubject: ${enquirySubject(enquiry)}\n\n${enquiryMessage(enquiry)}`;
}
