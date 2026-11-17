"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { EnquiryProvider } from "@/components/product/enquiry-context";

type Locale = "en" | "hi";

const copy = {
  en: {
    nav: {
      Home: "Home",
      About: "About",
      Products: "Products",
      Industries: "Industries",
      Contact: "Contact",
    },
    header: {
      search: "Search the site",
      enquiryList: "Open product enquiry list",
    },
    languageButton: "Hindi",
    switchToHindi: "Switch language to Hindi",
    switchToEnglish: "Switch language to English",
    logoHome: "Surya Power Industries home",
    skipLink: "Skip to content",
    statsLabel: "Surya Power Industries at a glance",
    certificationsLabel: "SPI certifications and approvals",
    mainNavigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    closeNavigation: "Close navigation menu",
    quote: "Get a quote",
    heroEyebrow: "Engineered protection · Made in India",
    heroTitle: "Complete Lightning Protection & Earthing Solutions",
    heroSubtitle:
      "Trusted ESE lightning arresters, earth electrodes and solar earthing systems.",
    callNow: "Call now",
    brochure: "Download brochure",
    heroNote: "Protection you can plan for. Performance you can rely on.",
    heroContact: "For earthing and solar installation, contact us.",
    heroImageAlt: "Illustration of a Surya Power ESE lightning arrester terminal",
    heroProductBadge: "ESE lightning arrester",
    heroEarthingAlt: "Electrical transmission infrastructure for earthing projects",
    heroEarthingBadge: "Earthing systems",
    ratedCurrent: "Rated current",
    warranty: "Year warranty",
    scrollExplore: "Scroll to explore",
    scrollExploreLabel: "Scroll to explore SPI",
    badges: ["ISO 9001:2015 certified", "Make in India", "NABL & CPRI tested"],
    testedBadge: "NABL & CPRI Tested",
    stats: ["Years of experience", "Product lines", "Rated ESE terminals", "ESE warranty"],
    statSuffixes: ["+", "+", "kA", " yrs"],
    certificationHeading: "Tested, trusted & recognized",
    certificationNote: "Quality credentials for projects that cannot compromise.",
    labReportBadge: "NABL & CPRI Tested Lab Reports",
    footer: {
      description:
        "Engineered lightning protection and earthing solutions for the infrastructure that powers a safer tomorrow.",
      tagline: "The Power of Universe",
      explore: "Explore",
      about: "About SPI",
      products: "Products",
      industries: "Industries",
      contact: "Contact",
      getInTouch: "Get in touch",
      address:
        "HO. 145B/1, Jawahar Nagar, Qazipur Road, Naini, Prayagraj, Uttar Pradesh – 211008",
      socialPlaceholder: "company profile placeholder",
      iso: "ISO 9001:2015 Certified",
      makeInIndia: "Make in India",
      rights: "All rights reserved.",
    },
    floating: {
      whatsappLabel: "Chat with SPI on WhatsApp",
      whatsappMessage:
        "Hello Surya Power Industries, I would like to enquire about your products.",
      scrollTop: "Scroll to top",
      callNow: "Call now",
      whatsapp: "WhatsApp",
      enquiry: "Enquiry",
    },
    calculator: {
      eyebrow: "Plan with confidence",
      title: "Estimate your protection radius",
      description:
        "Explore the supplied protection data by terminal, mounting height and protection level.",
      model: "ESE terminal",
      guard: "Surya Power Guard",
      sigmatech: "Surya Power Sigmatech",
      height: "Mounting height",
      level: "Protection level",
      result: "Estimated protection radius",
      levelNames: ["Level I", "Level II", "Level III", "Level IV"],
      unit: "metres",
      guardNote:
        "Surya Power Guard values use the supplied protection-radius table. Sigmatech values use the supplied NFC 17-102 formula with ΔL = 60 m for its 60 µs advance time. Estimates only; final system design requires site assessment.",
      buildingLabel: "Illustration of protection area around a building",
      building: "Protected structure",
    },
    how: {
      eyebrow: "A connected protection system",
      title: "How lightning protection works",
      description:
        "A coordinated path gives lightning current a controlled route from the air terminal into the ground.",
      steps: [
        {
          title: "Air terminal",
          description:
            "During a thunderstorm, the terminal emits an earlier upward streamer to provide a designated lightning interception point.",
        },
        {
          title: "Down conductor",
          description:
            "A correctly routed conductor carries current safely towards the earth termination.",
        },
        {
          title: "Earthing pit",
          description:
            "The earth electrode and connection provide a path for current dissipation into soil.",
        },
        {
          title: "Ground",
          description:
            "A designed earthing network helps distribute the current into the surrounding ground.",
        },
      ],
    },
    industriesSection: {
      eyebrow: "Industries we serve",
      title: "Protection for critical infrastructure",
      description:
        "From energy and transport to industrial facilities, SPI solutions support demanding environments.",
      cta: "Discuss your application",
    },
    aboutSection: {
      eyebrow: "About Surya Power Industries",
      title: "A trusted partner in earthing & lightning protection",
      intro:
        "Surya Power Industries (SPI) is a manufacturer and supplier of earthing and lightning protection products, serving industrial, commercial and solar applications for more than 12 years.",
      description:
        "Our goal is to offer reliable products at competitive prices and help customers choose the right material and size for their needs. We focus on quality, expert guidance, dependable service and customer satisfaction—from product selection to solar installation enquiries.",
      rangeTitle: "Our solutions include",
      groups: [
        {
          title: "Earthing systems",
          description:
            "GI, copper, copper-bonded and chemical electrodes, solid rods and earthing compounds.",
        },
        {
          title: "Lightning protection",
          description:
            "ESE and conventional arresters, lightning strike counters and installation accessories.",
        },
        {
          title: "Conductors & accessories",
          description:
            "GI and copper strips, plates, bare wires, earth-pit covers and cable management.",
        },
        {
          title: "Solar solutions",
          description:
            "Solar earthing kits, lightning protection and complete installation support.",
        },
      ],
      cta: "Explore SPI products",
      imageAlt:
        "Electrical transmission infrastructure representing SPI earthing and lightning protection solutions",
      imageCaption: "Protection systems for the infrastructure that powers everyday life.",
      proofPoints: [
        { value: "12+", label: "Years serving infrastructure projects" },
        { value: "200kA", label: "Rated ESE arrester range" },
      ],
    },
    featuredSolutions: {
      eyebrow: "SPI capabilities",
      title: "Engineered protection across every layer",
      description:
        "Explore dependable lightning, earthing and solar solutions designed to protect people, equipment and essential infrastructure.",
      viewAll: "Explore all services",
      cardCta: "View solution",
      cards: [
        {
          category: "Lightning protection",
          title: "ESE lightning arresters",
          description:
            "Purpose-built air terminals provide a controlled first line of defence for exposed sites and structures.",
          imageAlt: "Technical illustration of an ESE lightning arrester terminal",
        },
        {
          category: "Earthing & grounding",
          title: "Earth electrodes",
          description:
            "Copper-bonded, GI and chemical electrode options for dependable grounding across varied site conditions.",
          imageAlt: "Electrical utility infrastructure representing earthing systems",
        },
        {
          category: "Solar infrastructure",
          title: "Solar power protection",
          description:
            "Coordinated earthing and lightning protection support for solar plants and renewable energy projects.",
          imageAlt: "Solar panels at a utility-scale installation",
        },
      ],
    },
    why: {
      eyebrow: "Why choose SPI",
      title: "Built on quality. Backed by experience.",
      description:
        "Dependable products, clear guidance and responsive support from selection to installation.",
      cards: [
        {
          title: "12+ years of experience",
          description: "A trusted partner for earthing and lightning protection projects.",
        },
        {
          title: "ISO 9001:2015 certified",
          description: "Quality-led processes for consistent product delivery.",
        },
        {
          title: "NABL & CPRI tested",
          description: "Product testing and lab reports for informed project decisions.",
        },
        {
          title: "Standards-led design",
          description: "Products aligned with NFC 17-102 and IEC 62305 specifications.",
        },
        {
          title: "200kA rated ESE",
          description: "Specified ESE terminals with up to 200kA current withstand.",
        },
        {
          title: "20-year ESE warranty",
          description: "Manufacturer warranty on applicable ESE arrester models.",
        },
        {
          title: "Competitive pricing",
          description: "Reliable solutions with a focus on practical project value.",
        },
        {
          title: "Expert product guidance",
          description: "Support to choose material and size for your application.",
        },
        {
          title: "Make in India",
          description: "Indian manufacturing for projects across the country.",
        },
      ],
      benefitsEyebrow: "SPI protection systems",
      benefitsTitle: "Protection that supports everyday safety",
      benefitsDescription:
        "A well-designed earthing and lightning protection system helps protect people, property and electrical infrastructure.",
      benefits: [
        "Safety of home electrical appliances",
        "Protection from leakage current",
        "Potential savings on electricity bills",
        "Voltage supply stabilization",
        "Protection from lightning",
        "Protection from fire due to short circuit",
      ],
    },
    testimonials: {
      eyebrow: "Customer stories",
      title: "Trust built project by project",
      description:
        "Verified customer feedback will appear here. These cards are placeholders and must be replaced with approved testimonials before publishing.",
      previous: "Previous testimonial",
      next: "Next testimonial",
      slide: "Testimonial",
      carouselLabel: "Customer testimonial carousel",
      placeholderQuote: [
        "Add a verified customer story about product quality and delivery here.",
        "Add an approved testimonial about technical guidance here.",
        "Add a verified project reference and customer quote here.",
      ],
      customer: "Customer name",
      company: "Company / project",
      logoPlaceholder: "Approved client logo",
      clientLogosLabel: "Client logo placeholders",
      placeholderTag: "Preview content · replace before publishing",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Clear answers. Better decisions.",
      description:
        "Learn the basics of lightning protection, earthing materials, soil conditions and product warranties.",
      contact: "Need help with your project?",
      contactCta: "Talk to an SPI specialist",
    },
    cta: {
      eyebrow: "Start a conversation",
      title: "Need help selecting the right solution?",
      description:
        "Share your contact details and our team will help you identify suitable product options.",
      name: "Your name",
      phone: "Phone number",
      product: "What do you need help with?",
      choose: "Choose an area",
      options: [
        "Lightning protection",
        "Earthing",
        "Solar earthing",
        "Cable management",
        "Not sure — guide me",
      ],
      submit: "Prepare WhatsApp enquiry",
      followUp:
        "Your message is ready. Continue to WhatsApp to send it to the SPI team.",
      continue: "Continue to WhatsApp",
      formHint: "Your details are used only to prepare this enquiry.",
      phoneError: "Enter a valid phone number.",
      nameError: "Enter your name.",
    },
    catalog: {
      eyebrow: "SPI product catalogue",
      title: "Protection systems, built for the real world.",
      description:
        "Explore lightning protection, earthing, cable management and solar solutions from one product catalogue.",
      all: "All products",
      categories: [
        "Lightning Protection",
        "Earthing",
        "Accessories",
        "Cable Management",
        "Services",
      ],
      searchLabel: "Search products",
      searchPlaceholder: "Search by product, material or feature...",
      sortLabel: "Sort by",
      sortNameAsc: "Name: A to Z",
      sortNameDesc: "Name: Z to A",
      sortNewest: "Newest first",
      showing: "Showing",
      products: "products",
      noResults: "No products match your search.",
      clearFilters: "Clear filters",
      addToList: "Add to enquiry list",
      addedToList: "Added to enquiry list",
      quickView: "Quick view",
      compare: "Compare",
      compareSelected: "Compare selected",
      compareLimit: "Compare up to 3 products.",
      compareLimitReached: "You can compare up to 3 products at a time.",
      productDetails: "Product details",
      specifications: "Specifications",
      features: "Features",
      applications: "Applications",
      viewDetails: "View full details",
      close: "Close",
      itemAdded: "Added",
      remove: "Remove",
      comparison: "Product comparison",
      emptyCompare: "Select at least 2 products to compare.",
      field: "Specification",
      datasheet: "Request datasheet",
      datasheetNote: "Product datasheets are available from the SPI team.",
      related: "Related products",
      protectionRadius: "Protection radius (metres)",
      height: "Height",
      backToProducts: "Back to products",
      productInformation: "Product information",
      technicalSpecifications: "Technical specifications",
      keyFeatures: "Key features",
      suitableApplications: "Suitable applications",
      radiusTitle: "Protection radius by height",
      radiusDescription:
        "These values are supplied product data. Confirm protection level and installation height through a project-specific design.",
      heightMeters: "Height (m)",
      protectionLevelMeters: "Protection level L",
      relatedProductsTitle: "Related products",
      viewAllProducts: "View all products",
    },
    enquiry: {
      title: "Your enquiry list",
      description: "Collect products here, then send one enquiry to SPI.",
      emptyTitle: "Your list is empty",
      emptyDescription: "Add a product from the catalogue to get started.",
      remove: "Remove product",
      clear: "Clear list",
      sendWhatsApp: "Send enquiry via WhatsApp",
      sendEmail: "Send via email",
      addMore: "Browse products",
      close: "Close enquiry list",
      whatsappIntro: "Hello Surya Power Industries, I am interested in:",
      whatsappClosing: "Please share product information and a quotation.",
    },
    services: {
      navLabel: "Services",
      menuTitle: "Explore SPI services",
      menuDescription:
        "Integrated solutions for electrical safety, renewable energy and infrastructure.",
      needHelp: "Need help choosing?",
      talkExpert: "Talk to our expert",
      viewDetails: "View details",
      allServices: "Explore all services",
      catalogEyebrow: "Our capabilities",
      catalogTitle: "Services and solutions for every project.",
      catalogDescription:
        "Explore SPI's earthing, lightning protection, cable, solar balance-of-system and transformer services.",
      categoryLabel: "Service category",
      backToServices: "Back to services",
      detailsEyebrow: "SPI services",
      keyPoints: "How we can help",
      related: "Related services",
      enquireNow: "Enquire now",
      whatsappMessage:
        "Please share service information and a quotation for this requirement.",
      callNow: "Call our team",
      expandCategory: "Toggle service category",
      serviceCount: "services",
      closeMenu: "Close services menu",
    },
    command: {
      open: "Open search",
      title: "Search SPI",
      description: "Search pages and products",
      placeholder: "Type a page or product name...",
      pages: "Pages",
      products: "Products",
      noResults: "No matching pages or products.",
      keyboard: "Use Ctrl/⌘ K to open search",
    },
  },
  hi: {
    nav: {
      Home: "होम",
      About: "हमारे बारे में",
      Products: "उत्पाद",
      Industries: "उद्योग",
      Contact: "संपर्क",
    },
    header: {
      search: "वेबसाइट खोजें",
      enquiryList: "उत्पाद पूछताछ सूची खोलें",
    },
    languageButton: "English",
    switchToHindi: "भाषा हिंदी में बदलें",
    switchToEnglish: "भाषा अंग्रेज़ी में बदलें",
    logoHome: "सूर्या पावर इंडस्ट्रीज होम",
    skipLink: "मुख्य सामग्री पर जाएं",
    statsLabel: "सूर्या पावर इंडस्ट्रीज की एक झलक",
    certificationsLabel: "SPI प्रमाणपत्र और स्वीकृतियां",
    mainNavigation: "मुख्य नेविगेशन",
    mobileNavigation: "मोबाइल नेविगेशन",
    openMenu: "मेन्यू खोलें",
    closeMenu: "मेन्यू बंद करें",
    closeNavigation: "नेविगेशन मेन्यू बंद करें",
    quote: "कोटेशन लें",
    heroEyebrow: "इंजीनियर की गई सुरक्षा · भारत में निर्मित",
    heroTitle: "लाइटनिंग प्रोटेक्शन और अर्थिंग के संपूर्ण समाधान",
    heroSubtitle:
      "विश्वसनीय ESE लाइटनिंग अरेस्टर, अर्थ इलेक्ट्रोड और सोलर अर्थिंग सिस्टम।",
    callNow: "अभी कॉल करें",
    brochure: "ब्रोशर डाउनलोड करें",
    heroNote: "ऐसी सुरक्षा जिसकी योजना बनाएं। ऐसा प्रदर्शन जिस पर भरोसा करें।",
    heroContact: "अर्थिंग एवं सोलर लगवाने हेतु सम्पर्क करें",
    heroImageAlt: "सूर्या पावर ESE लाइटनिंग अरेस्टर का चित्र",
    heroProductBadge: "ESE लाइटनिंग अरेस्टर",
    heroEarthingAlt: "अर्थिंग परियोजनाओं के लिए विद्युत ट्रांसमिशन ढांचा",
    heroEarthingBadge: "अर्थिंग सिस्टम",
    ratedCurrent: "रेटेड करंट",
    warranty: "वर्ष की वारंटी",
    scrollExplore: "और जानने के लिए स्क्रोल करें",
    scrollExploreLabel: "SPI के बारे में और जानने के लिए स्क्रोल करें",
    badges: ["ISO 9001:2015 प्रमाणित", "मेक इन इंडिया", "NABL और CPRI परीक्षित"],
    testedBadge: "NABL और CPRI परीक्षित",
    stats: ["वर्षों का अनुभव", "उत्पाद श्रेणियां", "रेटेड ESE टर्मिनल", "ESE वारंटी"],
    statSuffixes: ["+", "+", "kA", " वर्ष"],
    certificationHeading: "परीक्षित, विश्वसनीय और मान्यता प्राप्त",
    certificationNote: "उन परियोजनाओं के लिए गुणवत्ता प्रमाण, जहां समझौता संभव नहीं।",
    labReportBadge: "NABL और CPRI परीक्षित लैब रिपोर्ट",
    footer: {
      description:
        "सुरक्षित भविष्य के लिए आवश्यक बुनियादी ढांचे हेतु लाइटनिंग प्रोटेक्शन और अर्थिंग समाधान।",
      tagline: "ब्रह्मांड की शक्ति",
      explore: "जानें",
      about: "SPI के बारे में",
      products: "उत्पाद",
      industries: "उद्योग",
      contact: "संपर्क",
      getInTouch: "संपर्क करें",
      address:
        "एच.ओ. 145B/1, जवाहर नगर, काजीपुर रोड, नैनी, प्रयागराज, उत्तर प्रदेश – 211008",
      socialPlaceholder: "कंपनी प्रोफाइल का उदाहरण",
      iso: "ISO 9001:2015 प्रमाणित",
      makeInIndia: "मेक इन इंडिया",
      rights: "सर्वाधिकार सुरक्षित।",
    },
    floating: {
      whatsappLabel: "WhatsApp पर SPI से बात करें",
      whatsappMessage:
        "नमस्ते सूर्या पावर इंडस्ट्रीज, मुझे आपके उत्पादों की जानकारी चाहिए।",
      scrollTop: "सबसे ऊपर जाएं",
      callNow: "कॉल करें",
      whatsapp: "WhatsApp",
      enquiry: "पूछताछ",
    },
    calculator: {
      eyebrow: "विश्वास के साथ योजना बनाएं",
      title: "सुरक्षा त्रिज्या का अनुमान लगाएं",
      description:
        "टर्मिनल, माउंटिंग ऊंचाई और सुरक्षा स्तर चुनकर उपलब्ध सुरक्षा डेटा देखें।",
      model: "ESE टर्मिनल",
      guard: "सूर्या पावर गार्ड",
      sigmatech: "सूर्या पावर सिग्माटेक",
      height: "माउंटिंग ऊंचाई",
      level: "सुरक्षा स्तर",
      result: "अनुमानित सुरक्षा त्रिज्या",
      levelNames: ["स्तर I", "स्तर II", "स्तर III", "स्तर IV"],
      unit: "मीटर",
      guardNote:
        "सूर्या पावर गार्ड के मान दिए गए सुरक्षा त्रिज्या चार्ट पर आधारित हैं। सिग्माटेक के मान दिए गए NFC 17-102 सूत्र और 60 µs एडवांस टाइम के लिए ΔL = 60 m पर आधारित हैं। यह केवल अनुमान है; अंतिम डिजाइन के लिए साइट का आकलन आवश्यक है।",
      buildingLabel: "इमारत के चारों ओर सुरक्षा क्षेत्र का चित्र",
      building: "सुरक्षित संरचना",
    },
    how: {
      eyebrow: "एक समन्वित सुरक्षा प्रणाली",
      title: "लाइटनिंग प्रोटेक्शन कैसे काम करता है",
      description:
        "एक समन्वित मार्ग बिजली के करंट को एयर टर्मिनल से जमीन तक नियंत्रित रास्ता देता है।",
      steps: [
        {
          title: "एयर टर्मिनल",
          description:
            "तूफान के दौरान टर्मिनल पहले ऊपर की ओर स्ट्रीमर उत्सर्जित करके बिजली के लिए निर्धारित इंटरसेप्शन बिंदु प्रदान करता है।",
        },
        {
          title: "डाउन कंडक्टर",
          description:
            "सही तरीके से लगाया गया कंडक्टर करंट को सुरक्षित रूप से अर्थिंग सिस्टम तक ले जाता है।",
        },
        {
          title: "अर्थिंग पिट",
          description:
            "अर्थ इलेक्ट्रोड और कनेक्शन करंट को मिट्टी में फैलाने का मार्ग देते हैं।",
        },
        {
          title: "जमीन",
          description:
            "डिजाइन किया गया अर्थिंग नेटवर्क करंट को आसपास की जमीन में वितरित करने में मदद करता है।",
        },
      ],
    },
    industriesSection: {
      eyebrow: "हम जिन उद्योगों की सेवा करते हैं",
      title: "महत्वपूर्ण बुनियादी ढांचे के लिए सुरक्षा",
      description:
        "ऊर्जा और परिवहन से लेकर औद्योगिक सुविधाओं तक, SPI समाधान कठिन परिस्थितियों के लिए हैं।",
      cta: "अपने उपयोग पर चर्चा करें",
    },
    aboutSection: {
      eyebrow: "सूर्या पावर इंडस्ट्रीज के बारे में",
      title: "अर्थिंग और लाइटनिंग प्रोटेक्शन में विश्वसनीय सहयोगी",
      intro:
        "सूर्या पावर इंडस्ट्रीज (SPI) औद्योगिक, वाणिज्यिक और सोलर उपयोगों के लिए अर्थिंग और लाइटनिंग प्रोटेक्शन उत्पादों का निर्माता और आपूर्तिकर्ता है। इस क्षेत्र में हमें 12 वर्षों से अधिक का अनुभव है।",
      description:
        "हमारा उद्देश्य उचित कीमतों पर भरोसेमंद उत्पाद देना और ग्राहकों को सही सामग्री और आकार चुनने में मदद करना है। हमारा ध्यान गुणवत्ता, विशेषज्ञ मार्गदर्शन, विश्वसनीय सेवा और ग्राहक संतुष्टि पर है—उत्पाद चयन से सोलर इंस्टॉलेशन तक।",
      rangeTitle: "हमारे समाधान",
      groups: [
        {
          title: "अर्थिंग सिस्टम",
          description:
            "GI, कॉपर, कॉपर-बॉन्डेड और केमिकल इलेक्ट्रोड, सॉलिड रॉड और अर्थिंग कंपाउंड।",
        },
        {
          title: "लाइटनिंग प्रोटेक्शन",
          description:
            "ESE और पारंपरिक अरेस्टर, लाइटनिंग स्ट्राइक काउंटर और इंस्टॉलेशन एक्सेसरीज़।",
        },
        {
          title: "कंडक्टर और एक्सेसरीज़",
          description:
            "GI और कॉपर स्ट्रिप, प्लेट, बेयर वायर, अर्थ-पिट कवर और केबल मैनेजमेंट।",
        },
        {
          title: "सोलर समाधान",
          description:
            "सोलर अर्थिंग किट, लाइटनिंग सुरक्षा और संपूर्ण इंस्टॉलेशन सहयोग।",
        },
      ],
      cta: "SPI उत्पाद देखें",
      imageAlt: "SPI अर्थिंग और लाइटनिंग सुरक्षा समाधानों को दर्शाता विद्युत ट्रांसमिशन ढांचा",
      imageCaption: "रोज़मर्रा की ऊर्जा को शक्ति देने वाले इंफ्रास्ट्रक्चर के लिए सुरक्षा।",
      proofPoints: [
        { value: "12+", label: "इंफ्रास्ट्रक्चर परियोजनाओं का अनुभव" },
        { value: "200kA", label: "रेटेड ESE अरेस्टर रेंज" },
      ],
    },
    featuredSolutions: {
      eyebrow: "SPI की क्षमताएं",
      title: "हर स्तर पर इंजीनियर की गई सुरक्षा",
      description:
        "लोगों, उपकरणों और आवश्यक बुनियादी ढांचे की सुरक्षा के लिए बनाई गई विश्वसनीय लाइटनिंग, अर्थिंग और सोलर सेवाएं देखें।",
      viewAll: "सभी सेवाएं देखें",
      cardCta: "समाधान देखें",
      cards: [
        {
          category: "लाइटनिंग प्रोटेक्शन",
          title: "ESE लाइटनिंग अरेस्टर",
          description:
            "विशेष रूप से बनाए गए एयर टर्मिनल खुले स्थानों और संरचनाओं के लिए नियंत्रित सुरक्षा प्रदान करते हैं।",
          imageAlt: "ESE लाइटनिंग अरेस्टर टर्मिनल का तकनीकी चित्र",
        },
        {
          category: "अर्थिंग और ग्राउंडिंग",
          title: "अर्थ इलेक्ट्रोड",
          description:
            "विभिन्न साइट परिस्थितियों के लिए कॉपर-बॉन्डेड, GI और केमिकल इलेक्ट्रोड विकल्प।",
          imageAlt: "अर्थिंग सिस्टम दर्शाता विद्युत यूटिलिटी ढांचा",
        },
        {
          category: "सोलर इंफ्रास्ट्रक्चर",
          title: "सोलर पावर सुरक्षा",
          description:
            "सोलर प्लांट और नवीकरणीय ऊर्जा परियोजनाओं के लिए समन्वित अर्थिंग और लाइटनिंग सुरक्षा।",
          imageAlt: "यूटिलिटी-स्केल सोलर इंस्टॉलेशन में सोलर पैनल",
        },
      ],
    },
    why: {
      eyebrow: "SPI को क्यों चुनें",
      title: "गुणवत्ता पर निर्मित। अनुभव से समर्थित।",
      description:
        "चयन से स्थापना तक विश्वसनीय उत्पाद, स्पष्ट मार्गदर्शन और सहयोग।",
      cards: [
        {
          title: "12+ वर्षों का अनुभव",
          description: "2014 से अर्थिंग और लाइटनिंग प्रोटेक्शन में विश्वसनीय सहयोगी।",
        },
        {
          title: "ISO 9001:2015 प्रमाणित",
          description: "उत्पाद की निरंतरता के लिए गुणवत्ता-आधारित प्रक्रियाएं।",
        },
        {
          title: "NABL और CPRI परीक्षित",
          description: "परियोजना निर्णयों के लिए उत्पाद परीक्षण और लैब रिपोर्ट।",
        },
        {
          title: "मानकों के अनुरूप डिजाइन",
          description: "NFC 17-102 और IEC 62305 विनिर्देशों के अनुरूप उत्पाद।",
        },
        {
          title: "200kA रेटेड ESE",
          description: "200kA तक करंट सहन क्षमता वाले निर्दिष्ट ESE टर्मिनल।",
        },
        {
          title: "ESE पर 20 वर्ष की वारंटी",
          description: "लागू ESE अरेस्टर मॉडल पर निर्माता की वारंटी।",
        },
        {
          title: "प्रतिस्पर्धी कीमतें",
          description: "परियोजना के व्यावहारिक मूल्य पर केंद्रित विश्वसनीय समाधान।",
        },
        {
          title: "विशेषज्ञ उत्पाद मार्गदर्शन",
          description: "आपके उपयोग के लिए सामग्री और आकार चुनने में सहायता।",
        },
        {
          title: "मेक इन इंडिया",
          description: "देशभर की परियोजनाओं के लिए भारतीय विनिर्माण।",
        },
      ],
      benefitsEyebrow: "SPI सुरक्षा प्रणाली",
      benefitsTitle: "रोजमर्रा की सुरक्षा में सहायक समाधान",
      benefitsDescription:
        "उचित अर्थिंग और लाइटनिंग प्रोटेक्शन सिस्टम लोगों, संपत्ति और विद्युत ढांचे की सुरक्षा में मदद करता है।",
      benefits: [
        "घरेलू विद्युत उपकरणों की सुरक्षा",
        "लीकेज करंट से सुरक्षा",
        "बिजली बिल में संभावित बचत",
        "वोल्टेज आपूर्ति का स्थिरीकरण",
        "बिजली गिरने से सुरक्षा",
        "शॉर्ट सर्किट से आग लगने की सुरक्षा",
      ],
    },
    testimonials: {
      eyebrow: "ग्राहकों की कहानियां",
      title: "हर परियोजना के साथ बना विश्वास",
      description:
        "यहां सत्यापित ग्राहक प्रतिक्रिया दिखाई जाएगी। ये उदाहरण हैं; प्रकाशित करने से पहले इन्हें स्वीकृत प्रशंसापत्र से बदलें।",
      previous: "पिछला प्रशंसापत्र",
      next: "अगला प्रशंसापत्र",
      slide: "प्रशंसापत्र",
      carouselLabel: "ग्राहक प्रशंसापत्र कैरोसेल",
      placeholderQuote: [
        "उत्पाद गुणवत्ता और डिलीवरी पर सत्यापित ग्राहक अनुभव यहां जोड़ें।",
        "तकनीकी मार्गदर्शन पर स्वीकृत ग्राहक प्रतिक्रिया यहां जोड़ें।",
        "सत्यापित परियोजना संदर्भ और ग्राहक की प्रतिक्रिया यहां जोड़ें।",
      ],
      customer: "ग्राहक का नाम",
      company: "कंपनी / परियोजना",
      logoPlaceholder: "स्वीकृत ग्राहक लोगो",
      clientLogosLabel: "ग्राहक लोगो के उदाहरण",
      placeholderTag: "उदाहरण सामग्री · प्रकाशित करने से पहले बदलें",
    },
    faq: {
      eyebrow: "अक्सर पूछे जाने वाले प्रश्न",
      title: "स्पष्ट जवाब। बेहतर निर्णय।",
      description:
        "लाइटनिंग प्रोटेक्शन, अर्थिंग सामग्री, मिट्टी की स्थिति और उत्पाद वारंटी की जानकारी पाएं।",
      contact: "क्या आपको परियोजना में सहायता चाहिए?",
      contactCta: "SPI विशेषज्ञ से बात करें",
    },
    cta: {
      eyebrow: "बातचीत शुरू करें",
      title: "सही समाधान चुनने में सहायता चाहिए?",
      description:
        "अपनी संपर्क जानकारी दें और हमारी टीम उपयुक्त उत्पाद चुनने में आपकी सहायता करेगी।",
      name: "आपका नाम",
      phone: "फोन नंबर",
      product: "आपको किस विषय में सहायता चाहिए?",
      choose: "विषय चुनें",
      options: [
        "लाइटनिंग प्रोटेक्शन",
        "अर्थिंग",
        "सोलर अर्थिंग",
        "केबल मैनेजमेंट",
        "निश्चित नहीं — मार्गदर्शन दें",
      ],
      submit: "WhatsApp पूछताछ तैयार करें",
      followUp:
        "आपका संदेश तैयार है। SPI टीम को भेजने के लिए WhatsApp पर जारी रखें।",
      continue: "WhatsApp पर जारी रखें",
      formHint: "आपकी जानकारी का उपयोग केवल यह पूछताछ तैयार करने के लिए होगा।",
      phoneError: "मान्य फोन नंबर दर्ज करें।",
      nameError: "अपना नाम दर्ज करें।",
    },
    catalog: {
      eyebrow: "SPI उत्पाद कैटलॉग",
      title: "वास्तविक जरूरतों के लिए सुरक्षा समाधान।",
      description:
        "एक ही कैटलॉग में लाइटनिंग प्रोटेक्शन, अर्थिंग, केबल मैनेजमेंट और सोलर समाधान देखें।",
      all: "सभी उत्पाद",
      categories: [
        "लाइटनिंग प्रोटेक्शन",
        "अर्थिंग",
        "एक्सेसरीज़",
        "केबल मैनेजमेंट",
        "सेवाएं",
      ],
      searchLabel: "उत्पाद खोजें",
      searchPlaceholder: "उत्पाद, सामग्री या विशेषता खोजें...",
      sortLabel: "क्रम",
      sortNameAsc: "नाम: A से Z",
      sortNameDesc: "नाम: Z से A",
      sortNewest: "नए पहले",
      showing: "दिखाए जा रहे हैं",
      products: "उत्पाद",
      noResults: "आपकी खोज से कोई उत्पाद नहीं मिला।",
      clearFilters: "फिल्टर हटाएं",
      addToList: "पूछताछ सूची में जोड़ें",
      addedToList: "पूछताछ सूची में जोड़ा गया",
      quickView: "झटपट देखें",
      compare: "तुलना करें",
      compareSelected: "चुने हुए उत्पादों की तुलना करें",
      compareLimit: "अधिकतम 3 उत्पादों की तुलना करें।",
      compareLimitReached: "एक बार में अधिकतम 3 उत्पादों की तुलना की जा सकती है।",
      productDetails: "उत्पाद विवरण",
      specifications: "विनिर्देश",
      features: "विशेषताएं",
      applications: "उपयोग",
      viewDetails: "पूरा विवरण देखें",
      close: "बंद करें",
      itemAdded: "जोड़ा गया",
      remove: "हटाएं",
      comparison: "उत्पाद तुलना",
      emptyCompare: "तुलना के लिए कम से कम 2 उत्पाद चुनें।",
      field: "विनिर्देश",
      datasheet: "डेटाशीट के लिए संपर्क करें",
      datasheetNote: "उत्पाद डेटाशीट SPI टीम से उपलब्ध हैं।",
      related: "संबंधित उत्पाद",
      protectionRadius: "सुरक्षा त्रिज्या (मीटर)",
      height: "ऊंचाई",
      backToProducts: "उत्पादों पर वापस जाएं",
      productInformation: "उत्पाद जानकारी",
      technicalSpecifications: "तकनीकी विनिर्देश",
      keyFeatures: "मुख्य विशेषताएं",
      suitableApplications: "उपयुक्त उपयोग",
      radiusTitle: "ऊंचाई के अनुसार सुरक्षा त्रिज्या",
      radiusDescription:
        "ये मान उपलब्ध उत्पाद डेटा पर आधारित हैं। सुरक्षा स्तर और स्थापना ऊंचाई की पुष्टि परियोजना-विशिष्ट डिजाइन से करें।",
      heightMeters: "ऊंचाई (मी)",
      protectionLevelMeters: "सुरक्षा स्तर L",
      relatedProductsTitle: "संबंधित उत्पाद",
      viewAllProducts: "सभी उत्पाद देखें",
    },
    enquiry: {
      title: "आपकी पूछताछ सूची",
      description: "उत्पाद जोड़ें और SPI को एक साथ पूछताछ भेजें।",
      emptyTitle: "सूची खाली है",
      emptyDescription: "शुरू करने के लिए कैटलॉग से कोई उत्पाद जोड़ें।",
      remove: "उत्पाद हटाएं",
      clear: "सूची साफ करें",
      sendWhatsApp: "WhatsApp से पूछताछ भेजें",
      sendEmail: "ईमेल से भेजें",
      addMore: "उत्पाद देखें",
      close: "पूछताछ सूची बंद करें",
      whatsappIntro: "नमस्ते सूर्या पावर इंडस्ट्रीज, मुझे इनमें रुचि है:",
      whatsappClosing: "कृपया उत्पाद की जानकारी और कोटेशन साझा करें।",
    },
    services: {
      navLabel: "सेवाएं",
      menuTitle: "SPI सेवाएं देखें",
      menuDescription:
        "विद्युत सुरक्षा, नवीकरणीय ऊर्जा और बुनियादी ढांचे के लिए एकीकृत समाधान।",
      needHelp: "चुनने में सहायता चाहिए?",
      talkExpert: "विशेषज्ञ से बात करें",
      viewDetails: "विवरण देखें",
      allServices: "सभी सेवाएं देखें",
      catalogEyebrow: "हमारी क्षमताएं",
      catalogTitle: "हर परियोजना के लिए सेवाएं और समाधान।",
      catalogDescription:
        "SPI की अर्थिंग, लाइटनिंग प्रोटेक्शन, केबल, सोलर BOS और ट्रांसफॉर्मर सेवाएं देखें।",
      categoryLabel: "सेवा श्रेणी",
      backToServices: "सेवाओं पर वापस जाएं",
      detailsEyebrow: "SPI सेवाएं",
      keyPoints: "हम कैसे सहायता कर सकते हैं",
      related: "संबंधित सेवाएं",
      enquireNow: "अभी पूछताछ करें",
      whatsappMessage:
        "कृपया इस आवश्यकता के लिए सेवा की जानकारी और कोटेशन साझा करें।",
      callNow: "हमारी टीम को कॉल करें",
      expandCategory: "सेवा श्रेणी खोलें या बंद करें",
      serviceCount: "सेवाएं",
      closeMenu: "सेवा मेन्यू बंद करें",
    },
    command: {
      open: "खोज खोलें",
      title: "SPI खोजें",
      description: "पेज और उत्पाद खोजें",
      placeholder: "पेज या उत्पाद का नाम लिखें...",
      pages: "पेज",
      products: "उत्पाद",
      noResults: "कोई मिलता-जुलता पेज या उत्पाद नहीं मिला।",
      keyboard: "खोज खोलने के लिए Ctrl/⌘ K दबाएं",
    },
  },
} as const;

type LanguageContextValue = {
  locale: Locale;
  toggleLocale: () => void;
  text: (typeof copy)[Locale];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function AppProviders({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      toggleLocale: () => setLocale((current) => (current === "en" ? "hi" : "en")),
      text: copy[locale],
    }),
    [locale],
  );
  const scrollOptions = useMemo(
    () => ({
      lerp: reduceMotion ? 1 : 0.075,
      smoothWheel: !reduceMotion,
      anchors: !reduceMotion,
    }),
    [reduceMotion],
  );

  return (
    <ReactLenis root options={scrollOptions}>
      <LanguageContext.Provider value={value}>
        <EnquiryProvider>{children}</EnquiryProvider>
      </LanguageContext.Provider>
    </ReactLenis>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within AppProviders.");
  }
  return context;
}
