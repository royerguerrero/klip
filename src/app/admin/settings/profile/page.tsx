import { Button } from "@heroui/react";

export default function Page() {
  return (
    <div className="px-4">
      <div className="flex gap-3 justify-between">
        <div>
          <h2 className="font-semibold text-xl tracking-tight leading-none">
            Tu perfil
          </h2>
          <p className="text-sm text-neutral-400 font-medium pt-0.5"></p>
        </div>
        <Button variant="flat">Crear</Button>
      </div>
    </div>
  );
}
