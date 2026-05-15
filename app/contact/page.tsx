// app/contact/page.tsx
import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Us | TextToolsMax",
  description: "Get in touch with the TextToolsMax team — questions, suggestions, bug reports, or tool requests.",
};

export default function Contact() {
  return <ContactClient />;
}