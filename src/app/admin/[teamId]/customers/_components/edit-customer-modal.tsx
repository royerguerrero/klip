"use client";

import {
  ColombianDocumentTypes,
  PhonePrefixes,
} from "@/app/admin/_lib/constants";
import { CustomerResponseDTO } from "@/contexts/backoffice/customer/application/CustomersResponse";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Button, DatePicker, Form, Input } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { useRouter } from "next/navigation";
import React from "react";
import { editCustomer } from "../_lib/actions";

type Props = {
  trigger: React.ReactElement<{ onPress?: () => void }>;
  customer: CustomerResponseDTO;
};

export default function CreateCustomerModal({ trigger, customer }: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const triggerWithHandler = React.cloneElement(trigger, {
    onPress: onOpen,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    editCustomer(customer.id, data);
    router.refresh();
  };

  return (
    <>
      {triggerWithHandler}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <Form onSubmit={onSubmit} validationBehavior="native">
              <ModalHeader className="flex flex-col gap-1 w-full tracking-tight">
                Edit Customer
              </ModalHeader>
              <ModalBody className="w-full">
                <Input
                  isRequired
                  label="First Name"
                  name="firstName"
                  type="text"
                  size="sm"
                  defaultValue={customer.firstName}
                />
                <Input
                  isRequired
                  label="Last Name"
                  name="lastName"
                  type="text"
                  size="sm"
                  defaultValue={customer.lastName}
                />
                <Input
                  isRequired
                  label="Identity Document Number"
                  name="identityDocumentNumber"
                  placeholder="xxxxxxxxxxx"
                  type="text"
                  defaultValue={customer.identityDocumentNumber}
                  startContent={
                    <div className="flex items-center">
                      <label className="sr-only">Prefix</label>
                      <select
                        className="outline-none border-0 bg-transparent text-small"
                        id="identityDocumentType"
                        name="identityDocumentType"
                        defaultValue={customer.identityDocumentType}
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
                  label="Phone Number"
                  name="phoneNumber"
                  placeholder="(123) 456-789"
                  type="text"
                  defaultValue={customer.phoneNumber}
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
                  label="Date of Birth"
                  isRequired
                  size="sm"
                  defaultValue={parseDate(
                    customer.dateOfBirth.toISOString().split("T")[0],
                  )}
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
                  Close
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  className="text-sm tracking-tight font-medium"
                  type="submit"
                  onPress={onClose}
                >
                  Save
                </Button>
              </ModalFooter>
            </Form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
