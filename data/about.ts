export type CompanyProductRange = {
  label: string;
  items: string[];
};

export const companyProfile = {
  heading: "Your Trusted Partner in Advanced Earthing & Lightning Protection Solutions",
  experienceYears: 12,
  introduction:
    "Surya Power Industries is a trusted manufacturer and supplier of earthing and lightning protection products with 12 years of experience. SPI specializes in dependable grounding solutions for industrial, commercial and solar applications.",
  commitment:
    "SPI is committed to products focused on safety, durability and performance. The team supports customized earthing systems and solar installations with guidance tailored to project requirements.",
  productRange: [
    {
      label: "Earthing electrodes",
      items: [
        "GI earth electrodes",
        "GI chemical earth electrodes",
        "Pure copper earth electrodes",
        "Copper bonded chemical electrodes",
        "Copper bonded solid earth rods",
      ],
    },
    {
      label: "Lightning protection",
      items: [
        "ESE lightning arresters",
        "Conventional lightning arresters",
        "Digital lightning strike counters",
        "Lightning arrester installation accessories",
      ],
    },
    {
      label: "Earthing materials",
      items: [
        "GI and copper strips",
        "Copper earthing plates",
        "Ground enhancing backfill compound",
        "Earthing pit covers, including CI, PVC, HDPE and polymer variants",
      ],
    },
    {
      label: "Solar and cable management",
      items: [
        "Solar earthing kits",
        "Solar installation services",
        "Perforated and ladder cable trays",
      ],
    },
  ] satisfies CompanyProductRange[],
} as const;
