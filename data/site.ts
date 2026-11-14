export const site = {
  name: "Surya Power Industries",
  shortName: "SPI",
  tagline: "The Power of Universe",
  url: "https://www.suryapowerindustries.com",
  alternateUrl: "https://www.spi.ind.in",
  description:
    "Indian manufacturer of lightning protection, earthing and solar earthing products.",
  contact: {
    address:
      "HO. 145B/1, Jawahar Nagar, Qazipur Road, Naini, Prayagraj, Uttar Pradesh – 211008",
    city: "Naini, Prayagraj",
    postalCode: "211008",
    region: "Uttar Pradesh",
    country: "India",
    phones: ["+91 93073 35739", "+91 91187 77507"],
    whatsapp: "919307335739",
    email: "suryapowerindustries@gmail.com",
  },
  certifications: [
    "CPRI",
    "UPPWD",
    "MSME",
    "RoHS",
    "ISO",
    "CE",
    "Hizal",
    "ODTU METU",
    "NABL & CPRI Tested",
  ],
  badges: ["ISO 9001:2015 Certified", "Make in India", "NABL & CPRI Tested"],
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Products", href: "/products" },
    { label: "Industries", href: "/#industries" },
    { label: "Contact", href: "/#home-enquiry" },
  ],
} as const;
