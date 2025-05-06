import ServiceDetailTabs from "./_components/tabs";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  return (
    <>
      <ServiceDetailTabs serviceId={id} />
      <div className="max-w-[800px] px-1 pt-14 mx-auto">{children}</div>
    </>
  );
}
