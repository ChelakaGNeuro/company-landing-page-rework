export type ServiceKey = "facade" | "access" | "digital" | "it";

export interface FacadeDetails {
  projectType: string;
  products: string[];
  scale: string;
  timeline: string;
}

export interface AccessDetails {
  projectType: string;
  products: string[];
  quantity: string;
  timeline: string;
}

export interface DigitalDetails {
  needs: string[];
  stage: string;
  budget: string;
  timeline: string;
}

export interface ITDetails {
  needs: string[];
  areas: string[];
  size: string;
  timeline: string;
}

export interface QuoteFormData {
  services: ServiceKey[];
  facade: FacadeDetails;
  access: AccessDetails;
  digital: DigitalDetails;
  it: ITDetails;
  location: string;
  fullName: string;
  companyName: string;
  countryCode: string;
  phone: string;
  email: string;
  contactMethod: "phone" | "email" | "whatsapp";
  bestTime: "morning" | "afternoon" | "evening" | "anytime";
  notes: string;
  files: File[];
}

export const INITIAL_FORM_DATA: QuoteFormData = {
  services: [],
  facade: { projectType: "", products: [], scale: "", timeline: "" },
  access: { projectType: "", products: [], quantity: "", timeline: "" },
  digital: { needs: [], stage: "", budget: "", timeline: "" },
  it: { needs: [], areas: [], size: "", timeline: "" },
  location: "",
  fullName: "",
  companyName: "",
  countryCode: "+94",
  phone: "",
  email: "",
  contactMethod: "phone",
  bestTime: "anytime",
  notes: "",
  files: [],
};
