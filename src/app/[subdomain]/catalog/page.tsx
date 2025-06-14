import Link from "next/link";
import ServiceCard from "../_components/service-card";
import { Input } from "@heroui/react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

type Props = {
  params: Promise<{ subdomain: string }>;
};

export default async function Page({ params }: Props) {
  const subdomain = (await params).subdomain;

  const categories = [
    {
      fingerprint: "1",
      title: "Programas",
      services: [
        {
          fingerprint: "1",
          title: "Programa 1",
          description: "Programa 1",
          pricing: {
            amount: 1000000,
            currency: "COP",
          },
          sessions: {
            amount: 1,
            duration: 30,
          },
        },
      ],
    },
  ];

  return (
    <>
      <header className="mb-3 border-b">
        <nav className="md:px-0 px-3 w-full md:max-w-[520px] mx-auto flex">
          {categories.map((category) => (
            <Link
              href={`catalog#${category.fingerprint}`}
              className="block border-b-2 border-neutral-800 text-neutral-800 text-sm p-2 font-semibold hover:opacity-60 transition-opacity"
            >
              {category.title}
            </Link>
          ))}
        </nav>
      </header>

      <main className="px-3 md:px-0 w-full md:max-w-[520px] mx-auto">
        {categories.map((category) => (
          <section
            key={category.fingerprint}
            id={category.fingerprint}
            className="space-y-2"
          >
            <h2 className="text-lg font-semibold">{category.title}</h2>
            {category.services.map((service) => (
              <Link
                href={`/${subdomain}/s/${service.fingerprint}`}
                className="cursor-pointer hover:opacity-70 transition-opacity block"
              >
                <ServiceCard
                  service={{
                    id: service.fingerprint,
                    title: service.title,
                    description: service.description,
                    pricing: {
                      amount: 1000000,
                      currency: "COP",
                    },
                    sessions: {
                      amount: 3,
                      duration: 30,
                    },
                  }}
                />
              </Link>
            ))}
          </section>
        ))}
      </main>
    </>
  );
}
