"use client";

import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  SelectSection,
} from "@heroui/react";
import { Form } from "@heroui/form";
import {
  ColombianDocumentTypes,
  PhonePrefixes,
} from "@/app/admin/_lib/constants";
import { getLocalTimeZone, today, parseDate } from "@internationalized/date";
import { CustomerResponseDTO } from "@/contexts/backoffice/customer/application/CustomersResponse";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  errors: Record<string, string>;
  customer?: CustomerResponseDTO;
  onClose: () => void;
};

export default function CustomerForm({
  onSubmit,
  errors,
  customer,
  onClose,
}: Props) {
  return (
    <Form
      onSubmit={onSubmit}
      validationBehavior="native"
      validationErrors={errors}
    >
      <Input
        isRequired
        label="Nombre"
        name="firstName"
        type="text"
        size="sm"
        defaultValue={customer?.firstName}
      />
      <Input
        isRequired
        label="Apellidos"
        name="lastName"
        type="text"
        size="sm"
        defaultValue={customer?.lastName}
      />
      <Select
        label="Tipo de Documento"
        name="identityDocumentType"
        size="sm"
        defaultSelectedKeys={
          customer?.identityDocument.type
            ? [customer.identityDocument.type]
            : undefined
        }
      >
        <SelectSection title="Colombia">
          {Object.entries(ColombianDocumentTypes).map(([key, value]) => (
            <SelectItem key={key}>{`${key} - ${value}`}</SelectItem>
          ))}
        </SelectSection>
      </Select>
      <Input
        isRequired
        label="Documento de identidad"
        name="identityDocumentNumber"
        type="text"
        defaultValue={customer?.identityDocument.documentNumber}
      />
      <Input
        isRequired
        label="Numero Celular"
        name="phoneNumber"
        placeholder="123456789"
        type="text"
        defaultValue={customer?.phoneNumber.number}
        startContent={
          <div className="flex items-center">
            <label className="sr-only" htmlFor="currency">
              Prefix
            </label>
            <select
              className="outline-none border-0 bg-transparent text-small"
              id="prefix"
              name="prefix"
              defaultValue={customer?.phoneNumber.prefix}
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
        defaultValue={
          customer?.dateOfBirth
            ? parseDate(customer.dateOfBirth.toISOString().split("T")[0])
            : undefined
        }
        maxValue={today(getLocalTimeZone()).subtract({ years: 13 })}
      />
      <div className="flex justify-end gap-2 w-full py-2">
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
      </div>
    </Form>
  );
}
