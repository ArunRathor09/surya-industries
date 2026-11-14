export type ProductCategory =
  | "Lightning Protection"
  | "Earthing"
  | "Accessories"
  | "Cable Management"
  | "Services";

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductGuideSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  note?: string;
};

export type ProtectionRadiusRow = {
  height: number;
  level1: number;
  level2: number;
  level3: number;
  level4: number;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: ProductCategory;
  summary: string;
  description: string;
  specifications: ProductSpec[];
  features: string[];
  guideSections?: ProductGuideSection[];
  applications?: string[];
  image: string;
  imageAlt: string;
  protectionRadius?: ProtectionRadiusRow[];
};

export const productCategories: ProductCategory[] = [
  "Lightning Protection",
  "Earthing",
  "Accessories",
  "Cable Management",
  "Services",
];

// Replace each image path with the corresponding approved product photograph.
export const products: Product[] = [
  {
    id: 1,
    slug: "surya-power-ese-lightning-arrester",
    name: "Surya Power ESE Lightning Arrester (Surya Power Guard)",
    category: "Lightning Protection",
    summary:
      "Early Streamer Emission terminal with ion generation channels, carrying lightning up to 200kA safely to ground.",
    description:
      "An autonomous Early Streamer Emission (ESE) terminal that uses ion generation channels to safely carry lightning currents up to 200kA to ground.",
    specifications: [
      { label: "Material", value: "Stainless Steel" },
      { label: "Weight", value: "4.20 kg" },
      { label: "External diameter", value: "187 mm" },
      { label: "Length", value: "63 cm" },
      { label: "Box length", value: "67 cm" },
      { label: "Rod diameter", value: "20 mm" },
      { label: "Adapter", value: "65.5 mm male" },
      { label: "Ingress protection", value: "IP67" },
      { label: "Working temperature", value: "-25°C to 90°C" },
      { label: "Type", value: "Electroatmospheric" },
      { label: "Internal insulation", value: "High Density Polyurethane Resin" },
      { label: "Standard", value: "NFC 17-102/2011" },
      { label: "Grounding", value: "Wire/Tape" },
      { label: "Maximum current withstand", value: "200kA (10/350µs)" },
      { label: "Advance time (AT)", value: "60 µs" },
    ],
    features: [
      "High salt mist treatment",
      "Humid sulphurous atmosphere treatment",
      "High voltage impulse emitter",
      "ION generator unit",
      "Completely autonomous",
      "30% more efficient than passive systems",
      "Testable with iTorrent testers",
      "20-year manufacturer warranty",
      "Tested per NFC 17-102/2011 (DeltaT advance time test, current withstand test)",
    ],
    guideSections: [
      {
        title: "Operating principle",
        paragraphs: [
          "The ESE terminal described in the supplied SPI material uses an ion-generation system to encourage an upward streamer during a thunderstorm. Its purpose is to provide a designated interception point; the lightning current still needs a correctly designed down-conductor and earth-termination path.",
        ],
        steps: [
          "Ambient electric charge builds around the terminal during storm conditions.",
          "The ESE unit emits an upward streamer earlier, as described by its tested advance-time rating.",
          "The terminal intercepts a strike within the designed protection zone.",
          "Down conductors and the earthing system route current safely toward the ground.",
        ],
        note: "Protection depends on site layout, installation height, bonding, down-conductor routing, earthing and the applicable design standard. A terminal does not guarantee that lightning will not strike.",
      },
      {
        title: "ESE and conventional air terminals",
        table: {
          headers: ["Consideration", "ESE terminal", "Conventional terminal"],
          rows: [
            ["Operating approach", "Active early-streamer-emission design", "Passive air-terminal design"],
            ["Design reference", "NFC 17-102/2011", "IEC 62305 design method"],
            ["Protection zone", "Calculated using validated advance time, height and protection level", "Calculated from terminal geometry, height and protection level"],
            ["Installation", "Requires down conductors and a coordinated earth termination", "Requires down conductors and a coordinated earth termination"],
          ],
        },
        bullets: [
          "Protection radius depends on mounting height above the protected structure.",
          "Protection level (I–IV) changes the radius calculation.",
          "For ESE designs, the tested advance time (ΔT/AT) is a key input.",
          "Product and installation cost depend on the selected system and project; compare complete designs, not only terminal prices.",
        ],
        note: "Use calculations permitted by the project standard and have the final protection design reviewed by a qualified lightning-protection professional.",
      },
    ],
    applications: [
      "High-rise buildings",
      "Airports",
      "Naval bases",
      "Open areas",
      "Critical military zones",
      "Stadiums",
      "Highways",
    ],
    image: "/products/surya-power-ese-lightning-arrester.jpg",
    imageAlt: "Placeholder image for Surya Power ESE lightning arrester",
    protectionRadius: [
      { height: 2, level1: 31, level2: 35, level3: 39, level4: 43 },
      { height: 3, level1: 47, level2: 52, level3: 58, level4: 64 },
      { height: 5, level1: 79, level2: 86, level3: 97, level4: 107 },
      { height: 10, level1: 79, level2: 88, level3: 99, level4: 109 },
      { height: 20, level1: 80, level2: 89, level3: 102, level4: 113 },
    ],
  },
  {
    id: 2,
    slug: "sush-ese-lightning-arrester",
    name: "Sush ESE Lightning Arrester",
    category: "Lightning Protection",
    summary:
      "All-weather 304L stainless steel ESE arrester with mechanical and environmental testing.",
    description:
      "A robust ESE lightning arrester manufactured in 304L (Inox) stainless steel and designed for demanding outdoor installations.",
    specifications: [
      { label: "Material", value: "304L (Inox) stainless steel" },
      { label: "Impulse current", value: "200kA (10/350µs)" },
      { label: "Advance time (AT)", value: "60 µs" },
      { label: "Salt mist test", value: "3 cycles / 72 hrs" },
      { label: "Humid sulphur test", value: "7 cycles / 168 hrs" },
      { label: "Mechanical test", value: "Passed" },
      {
        label: "Conductor compatibility",
        value:
          "Tape/strip, round conductor, isolated/insulated cables and HV shielded cables",
      },
    ],
    features: [
      "All-weather construction",
      "Mechanical test passed",
      "Salt mist and humid sulphur tested",
      "Compatible with multiple down-conductor types",
    ],
    image: "/products/sush-ese-lightning-arrester.jpg",
    imageAlt: "Placeholder image for Sush ESE lightning arrester",
  },
  {
    id: 3,
    slug: "surya-power-sigmatech-lightning-arrester",
    name: "Surya Power Sigmatech Lightning Arrester",
    category: "Lightning Protection",
    summary:
      "NFC 17-102/2011 compliant Sigmatech ESE terminal rated for 200kA.",
    description:
      "The Sigmatech model combines a stainless steel 316 body, tested current discharge, and ESE performance for a wide range of structures.",
    specifications: [
      { label: "Model", value: "Sigmatech" },
      { label: "Standard", value: "NFC 17-102/2011" },
      { label: "Maximum current", value: "200kA" },
      { label: "Advance time (AT)", value: "60 µs" },
      { label: "Material", value: "Stainless Steel 316" },
      { label: "Weight", value: "2.9 kg" },
      { label: "External diameter", value: "194 mm" },
      { label: "Height", value: "627 mm" },
      { label: "Box length", value: "81 cm" },
      { label: "Rod diameter", value: "20 mm" },
      { label: "Adapter", value: "60 mm male" },
      { label: "Ingress protection", value: "IP67" },
      {
        label: "Protection radius method",
        value:
          "NFC 17-102 (Sept 2011): Rp = sqrt(h(2D-h) + ΔL(2D+ΔL)); D = 20m (Level I), 30m (II), 45m (III), 60m (IV)",
      },
    ],
    features: [
      "+ve and -ve current discharge test",
      "Time lag/DeltaT gain measurement",
      "30% more efficient than passive systems",
      "Testable with ORBITAL testers",
      "20-year warranty",
    ],
    guideSections: [
      {
        title: "Product identification and supplied reference notes",
        paragraphs: [
          "The SPI product in this catalogue is the stainless-steel Sigmatech ESE terminal described by the specifications above. The supplied notes also include information about a separate third-party Sigmatech automation vendor and electrical surge-protection devices. That material does not establish an SPI affiliation, product equivalence or SPI specification.",
          "General third-party selection references mention Type 1/Class B devices, coordinated B+C protection, spark-gap modules, MOV components and indicators. These are electrical surge-protection devices and are not the same product as an ESE roof terminal.",
        ],
        bullets: [
          "For a separate electrical surge-protection device, confirm the system topology (such as TN-S, TT or IT) and applicable standard.",
          "Check device type, impulse current waveform/rating and coordination between upstream and downstream protection.",
          "Confirm any isolator, status indicator, follow-current limitation or voltage-protection rating against the exact manufacturer datasheet.",
          "The supplied third-party notes reference DIN EN 61643-11, VDE and IEC; verify current editions and certificates for the selected device.",
        ],
        note: "The third-party company profile, model claims and external references in the supplied text are not independently verified and must not be used as SPI product claims. Select electrical SPDs separately from structural lightning air terminals.",
      },
    ],
    image: "/products/surya-power-sigmatech-lightning-arrester.jpg",
    imageAlt: "Placeholder image for Surya Power Sigmatech lightning arrester",
  },
  {
    id: 4,
    slug: "surya-power-digital-lightning-strike-counter",
    name: "Surya Power Digital Lightning Strike Counter",
    category: "Lightning Protection",
    summary:
      "IP67 waterproof six-digit counter for recording lightning strike events.",
    description:
      "A rugged digital strike counter with a six-digit display for monitoring lightning current events on a protection system.",
    specifications: [
      { label: "Display", value: "6-digit" },
      { label: "Count range", value: "0–999999" },
      { label: "Current sensitivity", value: "300A (8/20µs)" },
      {
        label: "Alternate sensitivity in supplied notes",
        value: "500A (8/20µs) is also listed; verify the exact model datasheet",
      },
      { label: "Operating range", value: "1500A to 200kA" },
      {
        label: "Impulse waveform note",
        value: "Supplementary notes cite an 8/20µs measurement; confirm the rating and test waveform for the model",
      },
      { label: "Ingress protection", value: "IP67 waterproof" },
      { label: "Operating temperature", value: "-40 to +85°C" },
      { label: "Humidity", value: "≤95%" },
      { label: "Dimensions", value: "100 x 68 x 70 mm" },
      { label: "Weight", value: "0.67 kg" },
      { label: "Mounting", value: "6–10 mm cable or 50 x 5 mm tape" },
      { label: "Warranty", value: "5 years" },
      {
        label: "Display note",
        value: "The supplied notes also mention an 8-digit screen; the 0–999999 count range is six digits, so confirm the display specification",
      },
    ],
    features: [
      "Waterproof enclosure",
      "Six-digit event display",
      "5-year warranty",
      "Suitable for monitoring strike activity and supporting inspection or maintenance records",
    ],
    guideSections: [
      {
        title: "How a strike counter records events",
        paragraphs: [
          "Lightning counters detect the surge current on a down conductor and increment a stored event count. Common counter designs may use a current transformer, Rogowski coil or Hall-effect sensor, followed by signal conditioning and a display/counter circuit; the exact sensing method depends on the selected model.",
        ],
        bullets: [
          "Some advanced counters may include event timestamps, non-volatile logs, tamper-resistant enclosures or communications such as RS-485, GSM or LoRa.",
          "Power options can vary across models; battery or solar-powered variants mentioned in general notes are not confirmed for this SPI counter.",
          "Use a compatible current path and mounting position as specified in the product instructions.",
        ],
        note: "The supplied product notes conflict on display digits (six versus eight) and sensitivity (300A versus 500A). The 0–999999 count range supports six displayed digits; confirm the exact sensor threshold and display against the model datasheet before ordering.",
      },
    ],
    image: "/products/digital-lightning-strike-counter.jpg",
    imageAlt: "Placeholder image for digital lightning strike counter",
  },
  {
    id: 5,
    slug: "copper-copper-bonded-spike-lightning-arrester",
    name: "Copper / Copper Bonded / Spike Lightning Arrester",
    category: "Lightning Protection",
    summary:
      "Conventional lightning protection arrester options in pure, bonded or hollow copper.",
    description:
      "Conventional type lightning arresters manufactured to IEC 62305 in pure copper, copper bonded or hollow copper configurations.",
    specifications: [
      { label: "Standard", value: "IEC 62305" },
      { label: "Type", value: "Conventional" },
      { label: "Materials", value: "Pure copper / copper bonded / hollow copper" },
      { label: "Solid rod sizes", value: "16 mm diameter, 1 m or 2 m" },
      { label: "Hollow pipe sizes", value: "25 mm diameter, 1 m or 2 m" },
      {
        label: "Copper coating on bonded variants",
        value: "250–300 microns is cited for selected variants; confirm the supplied model",
      },
    ],
    features: [
      "Multiple material options",
      "Solid rod or hollow pipe formats",
      "Copper-bonded options combine a steel core with a corrosion-resistant copper surface",
      "Final length and mounting arrangement should follow the lightning protection design",
    ],
    applications: [
      "Residential and commercial buildings",
      "Telecommunication towers",
      "Industrial plants and power substations",
      "Solar panel installations",
    ],
    image: "/products/copper-lightning-arrester.jpg",
    imageAlt: "Placeholder image for copper lightning arrester",
  },
  {
    id: 6,
    slug: "ese-lightning-arrester-installation-accessories",
    name: "ESE LA Installation Accessories",
    category: "Accessories",
    summary:
      "Mounting and connection components for ESE lightning arrester installations.",
    description:
      "A range of installation accessories to support secure mounting and conductor routing for ESE lightning arresters.",
    specifications: [
      {
        label: "Available accessories",
        value: "Insulator, U Clamp, U Anchor Bolt, Anchor Bolt, Stray Wire, GI Mast",
      },
    ],
    features: ["Selection of installation hardware", "For ESE LA installations"],
    image: "/products/ese-installation-accessories.jpg",
    imageAlt: "Placeholder image for ESE lightning arrester installation accessories",
  },
  {
    id: 7,
    slug: "copper-bonded-solid-earth-rod",
    name: "Copper Bonded Solid Earth Rod",
    category: "Earthing",
    summary:
      "Copper-coated solid earth rod with 100–250 micron coating and 15+ years durability.",
    description:
      "A low-carbon steel core with electrolytically bonded copper coating combines mechanical strength with copper's corrosion resistance. The coating is 100–250 microns for long-lasting earthing performance.",
    specifications: [
      { label: "Copper coating", value: "100–250 micron" },
      { label: "Durability", value: "15+ years" },
      { label: "Diameters", value: "14.2 / 17.2 / 20 / 25 / 32 mm" },
      { label: "Lengths", value: "1 / 2 / 3 m" },
      {
        label: "Additional common lengths",
        value: "1.2 / 1.5 / 2.4 m are cited in supplementary notes; confirm the selected size with SPI",
      },
      { label: "Testing", value: "NABL & CPRI tested" },
    ],
    features: [
      "99.9% pure copper bonding",
      "High tensile strength",
      "Highly conductive and anti-corrosive",
      "Designed for low-maintenance service",
      "NABL & CPRI tested",
      "Copper bonding combines a mechanically strong steel core with a corrosion-resistant surface",
    ],
    image: "/products/copper-bonded-solid-earth-rod.jpg",
    imageAlt: "Placeholder image for copper bonded solid earth rod",
  },
  {
    id: 8,
    slug: "copper-bonded-chemical-earth-electrode",
    name: "Copper Bonded Chemical Earth Electrode",
    category: "Earthing",
    summary:
      "Copper-bonded chemical electrode with a crystalline conductive compound fill.",
    description:
      "A copper-bonded steel electrode with a copper-coated inner flat electrode and crystalline conductive compound filling. The compound helps retain moisture and support stable soil resistance.",
    specifications: [
      { label: "Diameters", value: "48 mm and 76 mm" },
      {
        label: "Additional typical diameters",
        value: "58 mm and 76–100 mm variants are mentioned in supplementary notes; confirm availability",
      },
      { label: "Lengths", value: "1 / 2 / 3 m" },
      { label: "Copper coating", value: "100–250 micron" },
      { label: "Electrode", value: "Copper-coated inner flat electrode" },
      { label: "Filling", value: "Crystalline conductive compound" },
      { label: "Durability", value: "15+ years" },
      { label: "Testing", value: "NABL & CPRI tested" },
    ],
    features: [
      "Copper coating 100–250 microns",
      "Crystalline conductive backfill",
      "Corrosion-resistant construction",
      "NABL & CPRI tested",
    ],
    applications: [
      "Electrical substations",
      "Data centres",
      "Telecommunications",
      "Solar power plants",
      "High-rise buildings",
      "Hospitals and sensitive electronics systems",
    ],
    image: "/products/copper-bonded-chemical-earth-electrode.jpg",
    imageAlt: "Placeholder image for copper bonded chemical earth electrode",
  },
  {
    id: 9,
    slug: "gi-earth-electrode",
    name: "GI Earth Electrode",
    category: "Earthing",
    summary:
      "Hot-dip galvanized earth electrode with moisture booster chemical bags.",
    description:
      "A galvanized iron rod or pipe electrode for safely dissipating fault or leakage current into the earth. The zinc coating helps resist corrosion in soil and moisture; choose a solid or perforated design and install it according to site conditions and the grounding design.",
    specifications: [
      { label: "Diameters", value: "48 / 58 / 76 mm" },
      {
        label: "Other typical sizes in supplied notes",
        value: "25–50 mm diameter and 2–3 m lengths are cited; confirm the exact SPI variant before specification",
      },
      { label: "Lengths", value: "1 / 2 / 3 m" },
      { label: "Finish", value: "Hot-dip galvanized" },
      { label: "Included", value: "Moisture booster chemical bags" },
      { label: "Soil pH suitability", value: "5.0–8.0" },
      { label: "Testing", value: "NABL & CPRI tested" },
    ],
    features: [
      "Supports fault current dissipation",
      "Low maintenance",
      "Moisture booster chemical bags",
      "Vertical or horizontal installation as per site design",
      "Zinc coating helps protect the iron body from soil and moisture corrosion",
      "Cost-effective option for residential, commercial and industrial installations",
    ],
    applications: [
      "Residential and commercial buildings",
      "Power substations and distribution networks",
      "Solar power systems",
      "Industrial electrical installations",
    ],
    image: "/products/gi-earth-electrode.jpg",
    imageAlt: "Placeholder image for GI earth electrode",
  },
  {
    id: 10,
    slug: "gi-chemical-earth-electrode",
    name: "GI Chemical Earthing Electrode",
    category: "Earthing",
    summary:
      "Galvanized iron pipe electrode used with conductive backfill for challenging soil conditions.",
    description:
      "A GI pipe electrode with openings for moisture and backfill distribution. It may include an inner conductor and a compatible conductive backfill compound; final selection should be based on soil and project requirements.",
    specifications: [
      { label: "Material", value: "Galvanized Iron (GI)" },
      { label: "Typical diameter range", value: "48–100 mm" },
      { label: "Typical length range", value: "1–3 m" },
      {
        label: "Typical configurations",
        value:
          "48 mm: 1.5–3 m, 3.2 mm wall; 58 mm: 2–3 m, 3.2–4 mm wall; 76/100 mm: 3 m, 4 mm+ wall",
      },
      {
        label: "Construction",
        value: "GI pipe with distribution openings; inner conductor on selected models",
      },
      {
        label: "Backfill",
        value: "Compatible bentonite or conductive compound, selected for the installation",
      },
      {
        label: "Design reference",
        value: "IS 3043; confirm project-specific code requirements",
      },
    ],
    features: [
      "Galvanized coating for corrosion resistance",
      "Conductive backfill for moisture retention",
      "Suitable for high-resistivity soil applications",
      "Typical dimensions should be confirmed for each project",
      "Backfill formulations may use bentonite, graphite or carbon-based conductors; select a compatible, non-corrosive grade",
    ],
    applications: [
      "Electrical panels and transformers",
      "Data centres and telecom towers",
      "Lightning protection systems",
      "Industrial and commercial buildings",
    ],
    image: "/products/gi-chemical-earth-electrode.jpg",
    imageAlt: "Placeholder image for GI chemical earthing electrode",
  },
  {
    id: 11,
    slug: "pure-copper-earth-electrode-rod",
    name: "Pure Copper Earth Electrode & Rod",
    category: "Earthing",
    summary: "100% copper earth electrode and rod for easy installation.",
    description:
      "Pure copper earthing electrodes designed for straightforward installation and suitability in soil pH 5.0–8.0.",
    specifications: [
      { label: "Material", value: "100% copper (99.9% electrolytic grade)" },
      { label: "Diameters", value: "48 mm and 76 mm" },
      {
        label: "Additional typical diameters",
        value: "40 / 50 / 80 mm sizes are mentioned in supplementary notes; confirm the available model",
      },
      { label: "Lengths", value: "1 / 2 / 3 m" },
      { label: "Soil pH suitability", value: "5.0–8.0" },
      {
        label: "Typical resistance reference",
        value: "Below 1 ohm is cited as a typical target; actual resistance depends on soil and system design",
      },
      { label: "Included", value: "Moisture booster bags on selected configurations" },
      { label: "Testing", value: "NABL & CPRI tested" },
    ],
    features: [
      "High electrical conductivity and corrosion resistance",
      "Conductive backfill on selected chemical configurations",
      "Easy installation",
      "Moisture booster bags",
      "Copper construction supports long service life in suitable soil conditions",
    ],
    applications: [
      "Data centres",
      "Telecommunication towers",
      "Industrial and commercial buildings",
      "Power generation plants",
      "Lightning protection systems",
    ],
    image: "/products/pure-copper-earth-electrode.jpg",
    imageAlt: "Placeholder image for pure copper earth electrode",
  },
  {
    id: 12,
    slug: "surya-power-backfill-compound",
    name: "Surya Power Backfill Compound (SPI Guard Advance Ground Enhancing Compound)",
    category: "Earthing",
    summary:
      "Graphite-based, non-toxic ground enhancing compound with resistivity below 0.2 ohm-meter.",
    description:
      "SPI Guard Advance Ground Enhancing Compound is a graphite-based, moisture-retaining material installed around an earth electrode to help lower and stabilize soil resistance. Follow the product data sheet and site design for preparation and installation.",
    specifications: [
      { label: "Bag sizes", value: "25 kg and 15 kg" },
      {
        label: "Other pack size mentioned",
        value: "50 kg is listed in supplementary notes; confirm current availability with SPI",
      },
      { label: "Resistivity", value: "Below 0.2 ohm-meter" },
      { label: "Composition", value: "Graphite based" },
      { label: "Safety", value: "Non-toxic" },
      { label: "Testing", value: "NABL accredited lab tested" },
    ],
    features: [
      "Helps reduce soil resistivity around the electrode",
      "Retains moisture longer",
      "No frequent watering required",
      "NABL accredited lab tested",
      "Backfill types across the market include bentonite, graphite, carbon and cement-based formulations; confirm compatibility for each installation",
    ],
    applications: [
      "Power stations and substations",
      "Telecommunication towers",
      "Solar and wind farms",
      "Industrial plants and data centres",
    ],
    image: "/products/surya-power-backfill-compound.jpg",
    imageAlt: "Placeholder image for Surya Power backfill compound",
  },
  {
    id: 13,
    slug: "gi-strips",
    name: "GI Strips",
    category: "Earthing",
    summary: "Hot-dip galvanized strips with minimum 86-micron zinc coating.",
    description:
      "Galvanized iron strips for earthing networks, with coating thickness specified at a minimum of 86 microns.",
    specifications: [
      { label: "Finish", value: "Hot dip galvanized" },
      { label: "Zinc coating", value: "Minimum 86 microns" },
      { label: "Service life", value: "Up to 15 years" },
      { label: "Sizes", value: "25x3, 25x6, 50x3, 50x6, 100x6, 100x12 mm" },
    ],
    features: ["Corrosion-resistant zinc coating", "Multiple strip sizes"],
    image: "/products/gi-strips.jpg",
    imageAlt: "Placeholder image for GI earthing strips",
  },
  {
    id: 14,
    slug: "copper-earthing-strip",
    name: "Copper Earthing Strip",
    category: "Earthing",
    summary: "EC-grade copper strip with 99.9% Cu purity.",
    description:
      "Corrosion-resistant EC-grade copper earthing strips for low-, medium- and high-voltage substations.",
    specifications: [
      { label: "Grade", value: "EC grade" },
      { label: "Copper purity", value: "99.9% Cu" },
      { label: "Sizes", value: "25x3 mm to 100x10 mm" },
      {
        label: "Typical range in supplementary notes",
        value: "Widths 20–100 mm and thicknesses 2–10 mm; confirm exact dimensions and finish",
      },
      { label: "Applications", value: "LV / MV / HV substations" },
    ],
    features: ["Corrosion resistant", "EC-grade copper"],
    image: "/products/copper-earthing-strip.jpg",
    imageAlt: "Placeholder image for copper earthing strip",
  },
  {
    id: 15,
    slug: "earthing-pit-covers",
    name: "Earthing Pit Covers",
    category: "Accessories",
    summary:
      "UV-resistant, chemical-resistant earthing pit covers in HDPE and polymer options.",
    description:
      "Pit covers manufactured to IEC 62561-5:2018, with UV and chemical resistance and a 2-screw fixing design.",
    specifications: [
      { label: "Standard", value: "IEC 62561-5:2018" },
      { label: "Features", value: "UV resistant, chemical resistant, 2-screw fixing" },
      {
        label: "Additional variants",
        value: "CI, PVC and FRP covers are also mentioned in supplementary notes; confirm material, load rating and availability with SPI",
      },
      {
        label: "SPI Micro 6”",
        value: "155D x 230H x 240B mm, 0.4 kg, HDPE",
      },
      { label: "Mini 7”", value: "177 x 230 x 270 mm, 0.7 kg, HDPE" },
      { label: "Big 11”", value: "260 x 265 x 340 mm, 1.2 kg, HDPE" },
      { label: "Square", value: "300 x 300 x 275 mm, 2.2 kg, HDPE" },
      { label: "PEP-S", value: "245 x 245 x 195 mm, 2.4 kg, Polymer" },
      { label: "PEP", value: "308 x 308 x 215 mm, 2.5 kg, Polymer" },
      { label: "PEP-B 300", value: "500 x 500 x 315 mm, 5.0 kg, Polymer" },
    ],
    features: [
      "UV and chemical resistant",
      "2-screw fixing on the supplied SPI range",
      "Helps prevent debris and accidental access while keeping the pit available for inspection",
      "Load-bearing capacity varies by cover type and installation location",
    ],
    applications: [
      "Electrical substations",
      "Residential and commercial buildings",
      "Telecommunication towers",
      "Solar installations and industrial facilities",
    ],
    image: "/products/earthing-pit-covers.jpg",
    imageAlt: "Placeholder image for earthing pit covers",
  },
  {
    id: 16,
    slug: "copper-earthing-plate",
    name: "Copper Earthing Plate",
    category: "Earthing",
    summary: "Copper earthing plate for project-specific grounding installations.",
    description:
      "Copper earthing plates are part of SPI's supplied product range. Plate dimensions, thickness, connection details and availability are confirmed against the project requirement.",
    specifications: [
      {
        label: "Typical dimensions",
        value: "300 x 300 mm or 600 x 600 mm, with 3–6 mm thickness; confirm project-specific availability",
      },
      {
        label: "Dimensions and thickness",
        value: "Confirm the required size, thickness and connection details with SPI",
      },
    ],
    features: [
      "99.9% copper is preferred for high conductivity and corrosion resistance",
      "Can be buried in a designed earth pit and connected with a compatible copper strip or conductor",
      "Use compatible conductive backfill when specified by the earthing design",
      "Copper construction",
      "Project-specific configuration",
    ],
    applications: [
      "Electrical substations",
      "Residential and commercial buildings",
      "Communication towers and data centres",
      "Power generation plants",
    ],
    image: "/products/copper-earthing-plate.jpg",
    imageAlt: "Placeholder image for copper earthing plate",
  },
  {
    id: 17,
    slug: "cable-trays",
    name: "Cable Trays",
    category: "Cable Management",
    summary:
      "Perforated and ladder-type trays in galvanized steel, stainless steel or aluminium.",
    description:
      "Cable trays are available in perforated and ladder types, with bolted knocked-down and welded constructions.",
    specifications: [
      {
        label: "Types",
        value:
          "Perforated (vertical/horizontal perforation); Ladder (bolted knocked-down, welded)",
      },
      { label: "Materials", value: "Galvanized steel, stainless steel, aluminium" },
      {
        label: "Finishes",
        value: "Pre-galvanized, hot-dip galvanized, powder coated",
      },
    ],
    features: ["Perforated or ladder type", "Multiple material and finish options"],
    image: "/products/cable-trays.jpg",
    imageAlt: "Placeholder image for cable trays",
  },
  {
    id: 18,
    slug: "solar-earthing-kit-and-installation-service",
    name: "Solar Earthing Kit & Solar Installation Service",
    category: "Services",
    summary:
      "Earthing and lightning protection for solar plants, with support for solar companies.",
    description:
      "Solar plant earthing and lightning protection products and installation support for solar companies.",
    specifications: [
      { label: "Service", value: "Solar plant earthing and lightning protection" },
      { label: "Support", value: "Solar company earthing support" },
      {
        label: "Service scope",
        value: "Site assessment, system planning and installation; confirm project scope with SPI",
      },
      {
        label: "System options",
        value: "Grid-tied, off-grid or hybrid, based on site and utility requirements",
      },
      {
        label: "Typical components",
        value: "Panels, inverter, mounting structure, wiring, optional batteries and monitoring as specified",
      },
      {
        label: "Service life reference",
        value: "Solar modules commonly have a 25–30 year design life; product warranties vary by manufacturer",
      },
    ],
    features: ["Solar plant earthing", "Solar lightning protection", "Installation support"],
    applications: [
      "Rooftop and ground-mounted solar projects",
      "Grid-tied, off-grid and hybrid systems, subject to project design",
      "Solar companies requiring earthing support",
    ],
    image: "/products/solar-earthing-kit.jpg",
    imageAlt: "Placeholder image for solar earthing kit and installation service",
  },
  {
    id: 19,
    slug: "bare-copper-wire",
    name: "Bare Copper Wire",
    category: "Earthing",
    summary:
      "Uninsulated copper conductor for earthing, electrical bonding and lightning protection.",
    description:
      "Bare copper wire is an uninsulated copper conductor supplied in solid or stranded constructions. Its high conductivity makes it suitable for grounding and bonding connections; select the conductor size and construction for the current rating and installation design.",
    specifications: [
      { label: "Material", value: "Copper; purity and grade to be confirmed for the selected conductor" },
      { label: "Construction", value: "Solid or stranded" },
      { label: "Insulation", value: "Bare / uninsulated" },
      { label: "Conductor size", value: "Project-specific; confirm gauge or cross-sectional area with SPI" },
    ],
    features: [
      "High electrical conductivity",
      "Suitable for earthing and electrical bonding",
      "Flexible stranded options for routing requirements",
      "Reusable and recyclable copper material",
    ],
    applications: [
      "Grounding systems",
      "Electrical bonding",
      "Lightning protection systems",
      "Automotive, marine and industrial installations",
    ],
    image: "/products/bare-copper-wire.jpg",
    imageAlt: "Illustration placeholder for bare copper earthing wire",
  },
  {
    id: 20,
    slug: "bare-gi-wire",
    name: "Bare GI Wire",
    category: "Earthing",
    summary:
      "Galvanized iron wire for utility, construction and selected grounding applications.",
    description:
      "Bare GI wire is iron wire protected by a zinc coating and supplied without an additional insulation layer. It is an economical option for selected utility and construction uses; confirm its suitability for an electrical grounding application with the project designer.",
    specifications: [
      { label: "Material", value: "Galvanized iron" },
      { label: "Coating", value: "Zinc galvanized; coating specification to be confirmed" },
      { label: "Insulation", value: "Bare / uninsulated" },
      { label: "Wire size", value: "Project-specific; confirm gauge or diameter with SPI" },
    ],
    features: [
      "Zinc coating helps resist corrosion",
      "Economical, workable wire construction",
      "Available gauges and lengths should be confirmed for the project",
    ],
    applications: [
      "Construction binding and fencing",
      "General utility applications",
      "Selected electrical grounding and bonding uses, subject to design",
    ],
    image: "/products/bare-gi-wire.jpg",
    imageAlt: "Illustration placeholder for bare galvanized iron wire",
  },
];
