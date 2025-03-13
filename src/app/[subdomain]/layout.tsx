import React from "react";
import type { Metadata } from "next";
import { retrieveCompany } from "./_lib/data";
import { notFound } from "next/navigation";
import { Avatar, Button } from "@heroui/react";
import { Bag, User } from "@phosphor-icons/react/dist/ssr";

type Props = {
  params: Promise<{ subdomain: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const subdomain = (await params).subdomain;

  const company = await retrieveCompany(subdomain);

  if (!company) {
    notFound();
  }

  return {
    title: company.seo.title,
    description: company.seo.description,
  };
}

export default async function Layout({ params, children }: Props) {
  const subdomain = (await params).subdomain;
  const company = await retrieveCompany(subdomain);

  if (!company) {
    notFound();
  }

  return (
    <>
      <header>
        <div
          className="h-[20vh] md:h-[26vh] bg-cover bg-no-repeat flex flex-col justify-between"
          style={{
            backgroundImage: `url('${company.banner}')`,
          }}
        >
          <div className="p-2 md:w-4/6 6 md:max-w-[600px] md:mx-auto flex justify-end items-center">
            <Avatar
              showFallback
              fallback={<User size={16} weight="fill" />}
              size="sm"
              className="bg-neutral-50/20 backdrop-blur text-neutral-50"
            />
          </div>
          <div className="p-2 md:w-4/6 6 md:max-w-[600px] md:mx-auto flex justify-between items-center border border-rose-500">
            <Avatar
              src={company.avatar}
              className="w-28 h-28 -mb-14 rounded-xl border-4"
              radius="lg"
            />
            <Button isIconOnly radius="full" variant="flat">
              <Bag size={24} />
            </Button>
          </div>
        </div>
        <div className="p-3 md:w-4/6 6 md:max-w-[600px] mx-auto mt-12">
          <h1 className="text-2xl font-semibold tracking-tight mb-1">
            {company.title}
          </h1>
          <p className="text-base text-neutral-400 tracking-tight leading-tight">
            {company.description}
          </p>
        </div>
      </header>
      <div className="min-h-[64vh]">{children}</div>
      <footer className="p-3 md:w-4/6 6 md:max-w-[600px] mx-auto flex gap-3 justify-between">
        <span className="text-sm text-neutral-400">
          © {company.title} ⋅ {new Date().getFullYear()}
        </span>
        <span className="text-sm text-neutral-400 font-semibold">Klip</span>
      </footer>
    </>
  );
}
