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
      <Button onPress={onOpen} variant="flat">
        Añadir Servicio
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <Form onSubmit={onSubmit} validationBehavior="native">
              <ModalHeader className="flex flex-col gap-1 w-full">
                Crear Servicio
              </ModalHeader>
              <ModalBody className="w-full">
                <Select name="category" label="Categoría" isRequired>
                  <SelectItem>Programas</SelectItem>
                </Select>
                <Input isRequired label="Titulo" name="title" type="text" />
                <Input
                  isRequired
                  label="Descripción"
                  name="description"
                  type="text"
                />
                <Input isRequired label="URL" name="url" type="text" />
              </ModalBody>
              <ModalFooter className="w-full">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" type="submit">
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
