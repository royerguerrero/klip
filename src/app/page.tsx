import Image from "next/image";
import { Button, Link } from "@heroui/react";

export default function Home() {
  return (
    <header className="w-full">
      <div className="px-3 py-4 mx-auto flex justify-between items-center gap-3">
        <Image src="./klip-icon.svg" width={40} height={40} alt="Klip Logo" />
        <nav className="flex gap-8">
          <Link
            href="/#features"
            color="foreground"
            className="text-neutral-700"
          >
            Producto
          </Link>
          <Link
            href="/#use-cases"
            color="foreground"
            className="text-neutral-700"
          >
            Casos de Uso
          </Link>
          <Link
            href="/#pricing"
            color="foreground"
            className="text-neutral-700"
          >
            Planes
          </Link>
          <Link href="/#faq" color="foreground" className="text-neutral-700">
            Preguntas Frecuentes
          </Link>
        </nav>
        <Link href="/admin/dashboard">
          <Button variant="flat" color="primary">
            Dashboard
          </Button>
        </Link>
      </div>
    </header>
  );
}
