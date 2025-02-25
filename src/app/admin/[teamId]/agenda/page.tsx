import { Button } from "@heroui/react";
import Heading from "../../_components/heading";
import { Plus } from "@phosphor-icons/react/dist/ssr";

export default function Page() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  return (
    <Heading title={currentDate}>
      <Button variant="flat" radius="full" size="sm" isIconOnly>
        <Plus size={18} />
      </Button>
    </Heading>
  );
}
