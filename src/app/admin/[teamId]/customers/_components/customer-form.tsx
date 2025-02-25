"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button, DatePicker, Form, Input } from "@heroui/react";
import { createCustomer } from "../_lib/actions";
import { useRouter } from "next/navigation";

export default function CustomerForm() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    createCustomer(data);
    router.refresh()
  };

  return (
    <>
      <Button onPress={onOpen} variant="flat" className="text-sm tracking-tight font-medium">
        Añadir Cliente
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <Form onSubmit={onSubmit} validationBehavior="native">
              <ModalHeader className="flex flex-col gap-1 w-full tracking-tight">
                Añadir Cliente
              </ModalHeader>
              <ModalBody className="w-full">
                <Input isRequired label="Nombre" name="firstName" type="text" />
                <Input
                  isRequired
                  label="Apellidos"
                  name="lastName"
                  type="text"
                />
                <Input
                  isRequired
                  label="Numero Celular"
                  name="phoneNumber"
                  placeholder="(123) 456-789"
                  type="text"
                  startContent={
                    <div className="flex items-center">
                      <label className="sr-only" htmlFor="currency">
                        Prefix
                      </label>
                      <select
                        className="outline-none border-0 bg-transparent text-small"
                        id="prefix"
                        name="prefix"
                      >
                        <option value="+57">🇨🇴 +57</option>
                      </select>
                    </div>
                  }
                />
                <DatePicker name="dob" label="Fecha de Nacimiento" isRequired />
              </ModalBody>
              <ModalFooter className="w-full">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" type="submit" onPress={onClose}>
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
