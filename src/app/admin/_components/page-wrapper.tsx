import { AppHeader } from "@/app/admin/_components/header";

interface PageWrapperProps {
  title: string;
  href?: string;
  breadcrumb?: {
    label: string;
    href: string;
  }[];
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function PageWrapper({ title, href, children, actions, breadcrumb }: PageWrapperProps) {
  return (
    <>
      <AppHeader title={title} actions={actions} breadcrumb={breadcrumb} href={href} />
      <div className="border h-full rounded-xl bg-background">
        {children}
      </div>
    </>
  );
} 