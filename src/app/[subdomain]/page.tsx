import { notFound } from "next/navigation";
import { retrieveCompany } from "./_lib/data";
import { Button, Chip } from "@heroui/react";
import Link from "next/link";
import {
  CaretDown,
  ClockCountdown,
  Storefront,
} from "@phosphor-icons/react/dist/ssr";

type Props = {
  params: Promise<{ subdomain: string }>;
};

export default async function Page({ params }: Props) {
  const subdomain = (await params).subdomain;
  const company = await retrieveCompany(subdomain);

  if (!company) {
    notFound();
  }

  return (
    <div className="md:w-4/6 6 md:max-w-[600px] md:mx-auto">
      {company.serviceCategories.length > 1 && (
        <nav>
          {company.serviceCategories.map((category) => (
            <Link
              key={category.fingerprint}
              href={`${subdomain}#${category.fingerprint}`}
            >
              <Button className="font-medium px-3">{category.title}</Button>
            </Link>
          ))}
        </nav>
      )}
      {company.serviceCategories.map((category) => (
        <section
          key={category.fingerprint}
          id={category.fingerprint}
          className="p-3"
        >
          <h2 className="font-semibold tracking-tight text-lg">
            {category.title}
          </h2>
          <div className="flex flex-col gap-2 pt-3">
            {category.services.map((service) => (
              <Link
                key={service.fingerprint}
                href={`${subdomain}/s/${service.fingerprint}`}
                className="p-3 border bg-neutral-100 rounded-xl flex flex-col gap-1"
              >
                <h2 className="text-lg font-semibold tracking-tight leading-tight">
                  {service.title}
                </h2>
                <p className="text-neutral-500 text-sm leading-4 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex justify-between gap-1">
                  <div>
                    <Chip
                      size="sm"
                      variant="flat"
                      radius="md"
                      startContent={<Storefront size={16} weight="duotone" />}
                      endContent={<CaretDown size={16} />}
                    >
                      Transversal 91
                    </Chip>
                  </div>
                  <div className="flex gap-1">
                    <Chip size="sm" variant="flat" radius="md">
                      $30.000 COP
                    </Chip>
                    <Chip
                      size="sm"
                      variant="flat"
                      radius="md"
                      startContent={
                        <ClockCountdown size={16} weight="duotone" />
                      }
                    >
                      43 min
                    </Chip>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
