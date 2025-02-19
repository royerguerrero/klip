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
import { parseDate } from "@internationalized/date";

export default function PaymentForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
  };

  return (
    <>
      <Button onPress={onOpen} variant="flat">Registrar Pago</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <Form onSubmit={onSubmit} validationBehavior="native">
              <ModalHeader className="flex flex-col gap-1 w-full">
                Registrar Pago
              </ModalHeader>
              <ModalBody className="w-full">
                <Input
                  endContent={
                    <div className="flex items-center">
                      <label className="sr-only" htmlFor="currency">
                        Currency
                      </label>
                      <select
                        className="outline-none border-0 bg-transparent text-default-400 text-small"
                        id="currency"
                        name="currency"
                      >
                        <option>COP</option>
                        <option>USD</option>
                      </select>
                    </div>
                  }
                  label="Valor"
                  placeholder="0"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">$</span>
                    </div>
                  }
                  type="number"
                />
                <DatePicker
                  name="paymentDate"
                  label="Fecha del Pago"
                  isRequired
                  granularity="day"
                  defaultValue={parseDate(new Date().toISOString().split('T')[0])}
                />
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
