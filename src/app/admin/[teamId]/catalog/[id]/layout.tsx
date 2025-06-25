import { PageWrapper } from "@/app/admin/_components/page-wrapper";
import { retrieveService } from "../_lib/data";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify-icon/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Heading } from "../../_components/heading";

type Props = {
  params: Promise<{
    id: string;
    teamId: string;
  }>;
  children: React.ReactNode;
};

export default async function CatalogItemLayout({ params, children }: Props) {
  const { id, teamId } = await params;
  const service = await retrieveService(id);

  if (!service) {
    notFound();
  }

  return (
    <PageWrapper
      title="Catálogo"
      href={`/admin/${teamId}/catalog`}
      breadcrumb={[
        {
          label: service.name,
          href: `/admin/${teamId}/catalog/${id}`,
        },
      ]}
      actions={
        <Button asChild>
          <Link href={`/admin/${teamId}/catalog/edit/${id}`}>Editar</Link>
        </Button>
      }
    >
      <main className="space-y-4 py-4">
        <Heading
          title={service.name}
          className="px-4"
        >
          <>
            <Button variant="secondary" asChild>
              <Link href={`/admin/${teamId}/catalog/edit/${id}`}>
                Nuevo agendamiento
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="size-8">
                  <Icon icon="ph:dots-three-vertical-bold" height={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8} className="w-56">
                <DropdownMenuItem asChild>
                  <Link href={`/admin/${teamId}/catalog/edit/${id}`}>
                    <Icon icon="ph:pencil-bold" height={16} />
                    Editar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/${teamId}/catalog/archive/${id}`}>
                    <Icon icon="ph:archive-bold" height={16} />
                    Archivar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/admin/${teamId}/catalog`}>
                    <Icon icon="ph:arrow-left-bold" height={16} />
                    Volver al catálogo
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        </Heading>
        {children}
      </main>
    </PageWrapper>
  );
} 