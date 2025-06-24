import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";
import { Separator } from "@/app/_components/ui/separator";
import { SidebarTrigger } from "@/app/_components/ui/sidebar";
import { cn } from "@/app/_lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  href?: string;
  breadcrumb?:
    | {
        label: string;
        href: string;
      }[]
    | null;
  actions?: React.ReactNode;
};

export function AppHeader({ title, breadcrumb, actions, href = "" }: Props) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-2 justify-between w-full">
        <div className="flex items-center gap-1">
          <SidebarTrigger className="-ml-1 text-muted-foreground" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="font-medium">
                <BreadcrumbLink asChild>
                  <Link href={href}>{title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumb && (
                <>
                  <BreadcrumbSeparator />
                  {breadcrumb.map((item, index) => (
                    <React.Fragment key={item.label}>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              index === breadcrumb.length - 1 &&
                                "font-semibold text-foreground"
                            )}
                          >
                            {item.label}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {index < breadcrumb.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))}
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        {actions && <div className="ml-auto">{actions}</div>}
      </div>
    </header>
  );
}
