import Image from "next/image";
import { Button, Link } from "@heroui/react";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";

export default function Header() {
  return (
    <header className="w-full border-x border-netural-100 flex p-4 items-center justify-between max-w-[1200px] m-auto">
      <div className="flex gap-8">
        <Image src="./klip-icon.svg" width={30} height={30} alt="Klip Logo" />
        <nav className="flex gap-8">
          <Link
            href="/#features"
            color="foreground"
            className="text-sm tracking-tight font-medium text-neutral-500"
          >
            Plataforma
          </Link>
          <Link
            href="/#use-cases"
            color="foreground"
            className="text-sm tracking-tight font-medium text-neutral-500"
          >
            Casos de Uso
          </Link>
          <Link
            href="/#pricing"
            color="foreground"
            className="text-sm tracking-tight font-medium text-neutral-500"
          >
            Planes
          </Link>
          <Link
            href="/#faq"
            color="foreground"
            className="text-sm tracking-tight font-medium text-neutral-500"
          >
            Preguntas Frecuentes
          </Link>
        </nav>
      </div>
      <div className="flex gap-3">
        <Link href="/admin/dashboard">
          <Button
            className="text-sm tracking-tight font-medium"
            size="sm"
            variant="light"
            endContent={<CaretRight size={12} weight="bold" />}
          >
            Contact sales
          </Button>
        </Link>
        <Link href="/admin/dashboard">
          <Button
            className="text-sm tracking-tight font-medium"
            size="sm"
            variant="flat"
            color="primary"
          >
            Dashboard
          </Button>
        </Link>
      </div>
    </header>
  );
}
