import Header from "@/app/(marketing)/_components/header";
import HeroSection from "@/app/(marketing)/_components/hero-section";
import ComparisonSection from "@/app/(marketing)/_components/comparison-section";
import TestimonialSection from "@/app/(marketing)/_components/testimonial-section";
import FeatureSection from "@/app/(marketing)/_components/feature-section";
import PricingSection from "@/app/(marketing)/_components/pricing-section";
import FAQSection from "@/app/(marketing)/_components/faq-section";
import Footer from "@/app/(marketing)/_components/footer";

export default function Home() {
  const features = [
    {
      id: "scheduling",
      icon: "ph:calendar-blank-fill",
      iconColor: "text-sky-500",
      title: "Organiza el día a día de tu negocio",
      description:
        "Nunca más te preocupes por la organización de tu negocio. Klip te ayuda a centralizar tus agendamientos, interacciones con tus clientes y pagos.",
    },
    {
      id: "catalog",
      icon: "ph:cards-three-fill",
      iconColor: "text-fuchsia-500",
      title: "Colocando tus servicios en el radar de miles",
      description:
        "Nunca más te preocupes por la organización de tu negocio. Klip te ayuda a centralizar tus agendamientos, interacciones con tus clientes y pagos.",
    },
    {
      id: "customers",
      icon: "ph:users-three-fill",
      iconColor: "text-rose-500",
      title: "Conecta con tus clientes",
      description:
        "Nunca más te preocupes por la organización de tu negocio. Klip te ayuda a centralizar tus agendamientos, interacciones con tus clientes y pagos.",
    },
    {
      id: "finances",
      icon: "ph:bank-fill",
      iconColor: "text-lime-500",
      title: "Las cuentas claras y el chocolate espeso. Recibe pagos y cobra",
      description:
        "Nunca más te preocupes por la organización de tu negocio. Klip te ayuda a centralizar tus agendamientos, interacciones con tus clientes y pagos.",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex flex-col gap-28 py-28">
        <HeroSection />
        <ComparisonSection />
        <TestimonialSection />

        {features.map((feature) => (
          <FeatureSection
            key={feature.id}
            id={feature.id}
            icon={feature.icon}
            iconColor={feature.iconColor}
            title={feature.title}
            description={feature.description}
          />
        ))}

        <PricingSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
