"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Button, DatePicker, Input } from "@heroui/react";
import { Form } from "@heroui/form";
import { useRouter } from "next/navigation";
import { createCustomer } from "../_lib/actions";
import {
  ColombianDocumentTypes,
  PhonePrefixes,
} from "@/app/admin/_lib/constants";
import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function CreateCustomerModal() {
  const router = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [errors, setErrors] = useState({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errors = await createCustomer(data);

    if (Object.keys(errors).length === 0) {
      onClose();
      router.refresh();
    } else {
      setErrors(errors);
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        variant="flat"
        color="primary"
        size="sm"
        className="text-sm tracking-tight font-medium"
      >
        Añadir Cliente
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <Form
              onSubmit={onSubmit}
              validationBehavior="native"
              validationErrors={errors}
            >
              <ModalHeader className="tracking-tight">
                Añadir Cliente
              </ModalHeader>
              <ModalBody className="w-full">
                <Input
                  isRequired
                  label="Nombre"
                  name="firstName"
                  type="text"
                  size="sm"
                />
                <Input
                  isRequired
                  label="Apellidos"
                  name="lastName"
                  type="text"
                  size="sm"
                />
                <Input
                  isRequired
                  label="Documento de identidad"
                  name="identityDocumentNumber"
                  placeholder="xxxxxxxxxxx"
                  type="text"
                  startContent={
                    <div className="flex items-center">
                      <label className="sr-only">Prefix</label>
                      <select
                        className="outline-none border-0 bg-transparent text-small"
                        id="identityDocumentType"
                        name="identityDocumentType"
                        defaultValue="CC"
                      >
                        {Object.entries(ColombianDocumentTypes).map(([key]) => (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        ))}
                      </select>
                    </div>
                  }
                />
                <Input
                  isRequired
                  label="Numero Celular"
                  name="phoneNumber"
                  placeholder="123456789"
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
                        {Object.entries(PhonePrefixes).map(([key, value]) => (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </div>
                  }
                />
                <DatePicker
                  name="dob"
                  label="Fecha de Nacimiento"
                  isRequired
                  size="sm"
                  maxValue={today(getLocalTimeZone()).subtract({years: 13})}
                />
              </ModalBody>
              <ModalFooter className="w-full">
                <Button
                  color="danger"
                  variant="light"
                  size="sm"
                  className="text-sm tracking-tight font-medium"
                  onPress={onClose}
                >
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  className="text-sm tracking-tight font-medium"
                  type="submit"
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
