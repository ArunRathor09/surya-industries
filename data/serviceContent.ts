import type { ServiceCategory } from "@/data/services";

type ServiceCopy = {
  description: string;
  keyPoints: string[];
};

const categoryCopy: Record<ServiceCategory["title"], ServiceCopy> = {
  "EARTHING & LIGHTNING": {
    description:
      "Grounding and lightning-protection components for residential, commercial and industrial installations. Final selection should follow the site conditions and project design.",
    keyPoints: [
      "Coordinate electrodes, conductors and accessories as one system.",
      "Select materials and dimensions for the installation environment.",
      "Confirm standards, sizing and compatibility with the SPI team.",
    ],
  },
  "WIRES & CABLES": {
    description:
      "Cable and conductor options for household, industrial, overhead and solar applications. Confirm ratings and applicable standards against the project specification.",
    keyPoints: [
      "Options for building, industrial, overhead and solar use.",
      "Review conductor size, insulation and installation conditions.",
      "Verify the required IS standard and electrical rating before ordering.",
    ],
  },
  "SOLAR BOS KIT": {
    description:
      "Balance-of-system components to support the electrical, mounting and grounding requirements of solar installations.",
    keyPoints: [
      "Coordinate mounting, cable and protection components.",
      "Plan solar earthing and grounding alongside the plant design.",
      "Ask SPI to confirm component compatibility for your project.",
    ],
  },
  TRANSFORMERS: {
    description:
      "Transformer supply and repair services for power, distribution and specialist applications. Share the project or equipment details to discuss suitability.",
    keyPoints: [
      "Power, distribution and specialist transformer options.",
      "Repair enquiries for selected power and distribution transformers.",
      "Confirm voltage, capacity, duty and service scope with SPI.",
    ],
  },
};

export function getServiceContent(category: ServiceCategory) {
  return categoryCopy[category.title];
}
