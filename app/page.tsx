import { CertificationsMarquee } from "@/components/home/certifications-marquee";
import { AboutSection } from "@/components/home/about-section";
import { FAQSection } from "@/components/home/faq-section";
import { FeaturedSolutions } from "@/components/home/featured-solutions";
import { HomeCTA } from "@/components/home/home-cta";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { IndustriesSection } from "@/components/home/industries-section";
import { ProtectionCalculator } from "@/components/home/protection-calculator";
import { StatsStrip } from "@/components/home/stats-strip";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhyUsSection } from "@/components/home/why-us-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <CertificationsMarquee />
      <AboutSection />
      <ProtectionCalculator />
      <HowItWorks />
      <FeaturedSolutions />
      <IndustriesSection />
      <WhyUsSection />
      <TestimonialsSection />
      <FAQSection />
      <HomeCTA />
    </>
  );
}
