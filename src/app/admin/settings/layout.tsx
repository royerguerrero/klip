import { Button } from "@heroui/react";
import Navbar from "./_components/navbar";
import Heading from "../_components/heading";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <Heading title="Configuración">
        <Button variant="flat">Soporte</Button>
      </Heading>
      <Navbar />
      <div className="pt-3">{children}</div>
    </div>
  );
}
