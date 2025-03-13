"use client";

import {
  Modal,
  ModalContent,
  Button,
  Kbd,
  useDisclosure,
  Input,
} from "@heroui/react";
import { KeyReturn, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { commands } from "./commands";

export default function CommandCenter() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const { command, setCommand } = useState();

  return (
    <>
      <Button
        className="w-[70vw] md:w-[40vw] justify-start text-neutral-500"
        variant="flat"
        onPress={onOpen}
      >
        <MagnifyingGlass size={18} weight="bold" />
        Buscar
        <Kbd keys={["command"]} className="text-xs bg-neutral-100 ml-auto">
          K
        </Kbd>
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="transparent"
        size="xl"
      >
        <ModalContent className="p-2 border">
          {() => (
            <>
              <Input
                startContent={
                  <MagnifyingGlass
                    className="text-neutral-500"
                    size={18}
                    weight="bold"
                  />
                }
              />
              <div className="flex flex-col gap-1 pt-2">
                {commands.map((cmd, idx) => (
                  <Button
                    key={idx}
                    className="justify-betweEn font-medium px-2"
                    variant="light"
                    startContent={cmd.icon}
                    endContent={
                      <KeyReturn
                        className="text-neutral-400"
                        size={18}
                        weight="fill"
                      />
                    }
                  >
                    <span className="mr-auto">{cmd.name}</span>
                  </Button>
                ))}
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
