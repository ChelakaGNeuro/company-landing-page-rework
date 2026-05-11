export const SERVICES = Object.freeze([
  "Facade Solutions",
  "Access Solutions",
  "Digital Solutions",
  "IT Infrastructure",
  "Other",
]);

export const CONTACT_INFO = Object.freeze([
  {
    LABEL: "Email",
    VALUE: "hello@gneuro.studio",
    HREF: "mailto:hello@gneuro.studio",
  },
  {
    LABEL: "Phone",
    VALUE: "+1 (555) 000-0000",
    HREF: "tel:+15550000000",
  },
  {
    LABEL: "Office",
    VALUE: "1559C, Malabe Road,\n Kottawa, Sri Lanka",
    HREF: undefined,
  },
]);

export const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2578893928544!2d79.96510237581772!3d6.859664219163886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2510073d89d0b%3A0x4e5ee9ae026d57e3!2sGNeuro%20Engineering%20Pvt%20Ltd!5e0!3m2!1sen!2sus!4v1778497134581!5m2!1sen!2sus";

export const SECTION = Object.freeze({
  heading: { base: "Get in ", accent: "touch." },
  subheading:
    "Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you as soon as possible.",
});

export const VALIDATION = Object.freeze({
  name: { min: 2, message: "Name must be at least 2 characters" },
  email: { message: "Please enter a valid email address" },
  service: { message: "Please select a service" },
  message: { min: 20, message: "Message must be at least 20 characters" },
});

export const PLACEHOLDERS = Object.freeze({
  name: "Jane Smith",
  email: "jane@company.com",
  message: "Tell us about your project…",
  service: "Select a service…",
});
