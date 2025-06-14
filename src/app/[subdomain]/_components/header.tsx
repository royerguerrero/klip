import { SalesFontCompanyDTO } from "@/contexts/sales-front/company/application/SalesFrontCompanyResponse";
import { Avatar, Button } from "@heroui/react";
import { Export } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

type Props = {
  company: SalesFontCompanyDTO;
  subdomain: string;
};

export default function Header({ company, subdomain }: Props) {
  return (
    <header className="p-3 pb-0 rounded-xl">
      <div
        className="h-[20vh] md:h-[26vh] bg-cover bg-no-repeat flex flex-col justify-end rounded-lg"
        style={{
          backgroundImage: `url('${company.banner}')`,
        }}
      >
        <div className="w-full md:max-w-[520px] md:mx-auto flex justify-between items-center px-2 md:px-0">
          <Link href={`/${subdomain}`}>
            <Avatar
              src={company.avatar}
              className="w-24 h-24 -mb-12 rounded-xl border-5 border-neutral-100"
              radius="lg"
            />
          </Link>
          <Button
            isIconOnly
            radius="full"
            variant="flat"
            className="bg-neutral-50/20 backdrop-blur size-7"
          >
            <Export size={16} weight="bold" className="text-neutral-50" />
          </Button>
        </div>
      </div>
      <div className="py-3 w-full md:max-w-[520px] mx-auto mt-10">
        <h1 className="text-xl font-semibold">{company.title}</h1>
        <p className="text-sm text-neutral-500 leading-tight">
          {company.description}
        </p>
      </div>
    </header>
  );
}
