"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button, Form, Input, Select, SelectItem } from "@heroui/react";

export default function ServiceForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant="flat"
        size="sm"
        color="primary"
        className="text-sm font-medium"
      >
        Añadir Servicio
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <Form onSubmit={onSubmit} validationBehavior="native">
              <ModalHeader className="flex flex-col gap-1 w-full tracking-tight">
                Crear Servicio
              </ModalHeader>
              <ModalBody className="w-full">
                <Select name="category" label="Categoría" isRequired size="sm">
                  <SelectItem>Programas</SelectItem>
                </Select>
                <Input
                  isRequired
                  label="Titulo"
                  name="title"
                  type="text"
                  size="sm"
                />
                <Input
                  isRequired
                  label="Descripción"
                  name="description"
                  type="text"
                  size="sm"
                />
                <Input
                  isRequired
                  label="URL"
                  name="url"
                  type="text"
                  size="sm"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">
                        academia-patry-ritchy
                      </span>
                    </div>
                  }
                  endContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">
                        klip.is
                      </span>
                    </div>
                  }
                />
              </ModalBody>
              <ModalFooter className="w-full">
                <Button
                  className="text-sm font-medium"
                  color="danger"
                  variant="light"
                  size="sm"
                  onPress={onClose}
                >
                  Cerrar
                </Button>
                <Button
                  className="text-sm font-medium"
                  color="primary"
                  variant="flat"
                  type="submit"
                  size="sm"
                >
                  Guardar
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
