"use client";

import {
  Button,
  Form,
  NumberInput,
  Input,
  Select,
  SelectItem,
  Textarea,
  SelectSection,
} from "@heroui/react";

interface Category {
  id: string;
  title: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  title: string;
}

const categories: Category[] = [
  {
    id: "programas",
    title: "Programas",
    subcategories: [],
  },
];

const service = {
  fingerprint: "tecnico-manos-y-pies",
  title: "Técnico en cuidado estético de manos y pies",
  description:
    "Especialízate en manicure, pedicure y técnicas spa, embelleciendo y cuidando manos y pies con resultados profesionales.",
  category: {
    id: "programas",
    title: "Programas",
  },
  subcategory: {
    id: "",
    title: "",
  },
  duration: 6 * 30 * 24,
  availability: [
    {
      name: "Mañana",
      repeat: "Mon-Sat",
      form: "09:00",
      to: "12:00",
      locations: [
        {
          type: "inPerson",
          options: {
            address: "8712cbdd-cda1-4889-97ec-2547110660a7",
            maxCapacity: 15,
          },
        },
        {
          type: "inPerson",
          options: {
            address: "8712cbdd-cda1-4889-97ec-2547110660a7",
            maxCapacity: 15,
          },
        },
      ],
    },
    {
      name: "Tarde",
      repeat: "Mon-Sat",
      form: "14:00",
      to: "17:00",
      locations: [
        {
          type: "inPerson",
          options: {
            address: "8712cbdd-cda1-4889-97ec-2547110660a7",
            maxCapacity: 15,
          },
        },
        {
          type: "inPerson",
          options: {
            address: "8712cbdd-cda1-4889-97ec-2547110660a7",
            maxCapacity: 15,
          },
        },
      ],
    },
    {
      name: "Noche",
      repeat: "Mon-Sat",
      form: "17:00",
      to: "20:00",
      locations: [
        {
          type: "inPerson",
          options: {
            address: "8712cbdd-cda1-4889-97ec-2547110660a7",
            maxCapacity: 15,
          },
        },
        {
          type: "inPerson",
          options: {
            address: "8712cbdd-cda1-4889-97ec-2547110660a7",
            maxCapacity: 15, // attendees
          },
        },
      ],
    },
  ],
  payments: {
    type: "installments",
    price: {
      currency: "COP",
      value: 1200000,
    },
    options: {
      installments: 6,
      installmentFrequency: 14, // days
    },
  },
  company_id: "4d592af9-5f65-4638-9e72-48a51bbba77d",
};

export default function ServiceInformationForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data);
  };

  return (
    <Form
      onSubmit={onSubmit}
      validationBehavior="native"
      className="flex flex-col gap-2 w-full h-full relative"
    >
      <section className="flex flex-col gap-3 w-full p-3">
        <h2 className="font-semibold tracking-tight text-lg leading-none">
          Detalles
        </h2>
        <div className="grid grid-cols-2 gap-3 w-full">
          <Select
            name="category"
            label="Categoria"
            isRequired
            size="sm"
            defaultSelectedKeys={[service.category.id]}
          >
            <SelectSection className="border border-rose-500 flex-col gap-2">
              <>
                <SelectItem className="p-0" isReadOnly>
                  <Button
                    variant="flat"
                    color="primary"
                    className="w-full text-sm"
                    size="sm"
                  >
                    Añadir categoría
                  </Button>
                </SelectItem>
              </>
            </SelectSection>
            <SelectSection>
              {categories.map((category) => (
                <SelectItem key={category.id}>{category.title}</SelectItem>
              ))}
            </SelectSection>
          </Select>
          <Select
            name="subcategory"
            label="Subcategoria"
            size="sm"
            defaultSelectedKeys={
              service.subcategory.id ? [service.subcategory.id] : []
            }
          >
            {categories.map((category) => (
              <SelectSection title={category.title} key={category.id}>
                {category.subcategories.length > 0
                  ? category.subcategories.map((subcategory) => (
                      <SelectItem key={subcategory.id}>
                        {subcategory.title}
                      </SelectItem>
                    ))
                  : null}
              </SelectSection>
            ))}
          </Select>
        </div>
        <Input
          name="title"
          label="Titulo"
          defaultValue={service.title}
          isRequired
          size="sm"
        />
        <Textarea
          name="description"
          label="Descripción"
          defaultValue={service.description}
          isRequired
          size="sm"
        />
        <Input
          isRequired
          label="URL"
          name="url"
          type="text"
          size="sm"
          className="gap-0"
          defaultValue={service.fingerprint}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small whitespace-nowrap">
                klip.is/academia-patry-ritchy/s/
              </span>
            </div>
          }
        />
      </section>
      <section className="flex flex-col gap-3 w-full p-3">
        <h2 className="font-semibold tracking-tight text-lg leading-none">
          Duración
        </h2>
        <NumberInput
          name="duration"
          label="Duración"
          defaultValue={service.duration}
          min={0}
          isRequired
          size="sm"
          endContent={
            <div className="flex items-center">
              <label className="sr-only" htmlFor="timeUnit">
                Time Unit
              </label>
              <select
                aria-label="Select time unit"
                className="outline-none border-0 bg-transparent text-default-400 text-small"
                defaultValue="minutes"
                id="timeUnit"
                name="timeUnit"
              >
                <option aria-label="Minutes" value="minutes">
                  Minutos
                </option>
                <option aria-label="Hours" value="hours">
                  Horas
                </option>
              </select>
            </div>
          }
        />
      </section>
      <Button
        type="submit"
        size="sm"
        className="text-sm font-medium tracking-tight w-fit mx-3"
        variant="flat"
        color="primary"
      >
        Guardar
      </Button>
    </Form>
  );
}
