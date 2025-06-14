import type { Metadata } from "next";
import { retrieveCompany } from "./_lib/data";
import { Navigation } from "./_components/navigation";
import { notFound } from "next/navigation";
import Header from "./_components/header";

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
      <Header company={company} subdomain={subdomain} />
      {children}
      <footer className="fixed bottom-0 left-0 right-0">
        <Navigation subdomain={subdomain} />
      </footer>
    </>
  );
}
