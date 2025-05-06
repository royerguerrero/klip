"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/modal";
import { useRouter } from "next/navigation";
import { createCustomer } from "../_lib/actions";
import { useState } from "react";
import React from "react";
import CustomerForm from "./customer-form";

type Props = {
  trigger: React.ReactElement<{ onPress?: () => void }>;
};

export default function CreateCustomerModal({ trigger }: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [errors, setErrors] = useState({});

  const triggerWithHandler = React.cloneElement(trigger, {
    onPress: onOpen,
  });

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
      {triggerWithHandler}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="tracking-tight">
                Añadir Cliente
              </ModalHeader>
              <ModalBody className="w-full">
                <CustomerForm
                  onSubmit={onSubmit}
                  errors={errors}
                  onClose={onClose}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
