import {
  Cog,
  ShieldCheck,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { serviceImages } from "@/data/serviceImages";

export type ServiceItem = {
  label: string;
  slug: string;
  image: string;
};

export type ServiceCategory = {
  title: string;
  icon: LucideIcon;
  items: ServiceItem[];
};

export function slugifyService(label: string) {
  return label
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createItems(labels: string[]): ServiceItem[] {
  return labels.map((label) => {
    const slug = slugifyService(label);
    const image = serviceImages[slug];
    if (!image) {
      throw new Error(`Missing service image mapping for "${slug}".`);
    }
    return { label, slug, image };
  });
}

export const services: ServiceCategory[] = [
  {
    title: "EARTHING & LIGHTNING",
    icon: ShieldCheck,
    items: createItems([
      "Earthing Electrode",
      "Earthing Pit Cover",
      "ESE Lightning Arresters",
      "Back Fill Compounds",
      "Earthing Strip",
      "Wires and Cables",
      "Copper Bonded Rods",
      "Copper Grounding Rods",
      "Industrial Clamp",
    ]),
  },
  {
    title: "WIRES & CABLES",
    icon: Zap,
    items: createItems([
      "Household & Industrial FRLSH Cables - IS 694:2010",
      "House Hold Cable - IS 694:2010",
      "True Power Multicore Cable (IS 694:2010)",
      "Aerial Bunched Cable (IS 14255)",
      "Solar Cable IS 17293:2020",
      "ACSR Conductors (IS 398-II)",
    ]),
  },
  {
    title: "SOLAR BOS KIT",
    icon: Sun,
    items: createItems([
      "Solar Mounting Structures",
      "Solar Inverters",
      "Solar DC Cables and AC Cables",
      "Solar Connectors",
      "Combiner Boxes",
      "Solar Charge Controllers",
      "Surge Protectors and Disconnect Switches",
      "Energy Meters and Monitoring Devices",
      "Solar Earthing and Grounding Systems",
      "Earthing Electrodes",
      "Earthing Backfill Compound",
      "Earthing Pit Covers",
      "GI Earthing Strips",
    ]),
  },
  {
    title: "TRANSFORMERS",
    icon: Cog,
    items: createItems([
      "Power Transformers",
      "Distribution Transformers",
      "Isolation Transformer",
      "PIT Lighting Transformer",
      "Rectifier Transformer",
      "Power Transformer Repair",
      "Distribution Transformer Repairs",
    ]),
  },
];

export const allServices = services.flatMap((category) =>
  category.items.map((item) => ({ ...item, category: category.title })),
);
