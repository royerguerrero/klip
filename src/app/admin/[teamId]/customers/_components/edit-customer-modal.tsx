"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import { useRouter } from "next/navigation";
import { editCustomer } from "../_lib/actions";
import { useState } from "react";
import React from "react";
import CustomerForm from "./customer-form";
import { CustomerResponseDTO } from "@/contexts/backoffice/customer/application/CustomersResponse";

type Props = {
  customer: CustomerResponseDTO;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditCustomerModal({
  customer,
  isOpen,
  onOpenChange,
}: Props) {
  const router = useRouter();
  const [errors, setErrors] = useState({});

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => {
            const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const errors = await editCustomer(customer.id, data);

              if (Object.keys(errors).length === 0) {
                onClose();
                router.refresh();
              } else {
                setErrors(errors);
              }
            };

            return (
              <>
                <ModalHeader className="tracking-tight">
                  Editar Cliente
                </ModalHeader>
                <ModalBody className="w-full">
                  <CustomerForm
                    onSubmit={onSubmit}
                    errors={errors}
                    customer={customer}
                    onClose={onClose}
                  />
                </ModalBody>
              </>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
}
