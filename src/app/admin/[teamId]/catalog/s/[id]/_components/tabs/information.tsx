"use client";

import {
  Form,
  Input,
  Select,
  SelectItem,
  SelectSection,
  Textarea,
  NumberInput,
  Tabs,
  Tab,
  Slider,
  Button,
} from "@heroui/react";
import { MapPinPlus, Storefront } from "@phosphor-icons/react/dist/ssr";

interface Subcategory {
  id: string;
  title: string;
}

interface Category {
  id: string;
  title: string;
  subcategories: Subcategory[];
}

export default function InformationTab() {
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
              maxCapacity: 15,
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
      },
    },
    company_id: "4d592af9-5f65-4638-9e72-48a51bbba77d",
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data);
  };

  return (
    <Form onSubmit={onSubmit} validationBehavior="native" className="p-3">
      <section className="w-full border p-2 flex flex-col gap-2 rounded-xl">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Select
            name="category"
            label="Categoria"
            isRequired
            size="sm"
            defaultSelectedKeys={[service.category.id]}
            isDisabled
          >
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
            isDisabled
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
          isDisabled
        />
        <Textarea
          name="description"
          label="Descripción"
          defaultValue={service.description}
          isRequired
          size="sm"
          isDisabled
        />
        <NumberInput
          name="duration"
          label="Duración"
          defaultValue={service.duration}
          min={0}
          isRequired
          isDisabled
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
        <Input
          isRequired
          label="URL"
          name="url"
          type="text"
          size="sm"
          className="gap-0"
          defaultValue={service.fingerprint}
          isDisabled
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small whitespace-nowrap">
                academia-patry-ritchy.
              </span>
            </div>
          }
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">klip.is</span>
            </div>
          }
        />
      </section>
      <section className="p-2 border rounded-xl w-full">
        <Tabs
          aria-label="Tabs Payments"
          className="w-full"
          classNames={{
            tabList: "w-full",
          }}
        >
          <Tab key="one-time" title="Pago unico">
            <NumberInput
              isDisabled
              name="price"
              label="Precio"
              isRequired
              size="sm"
              min={1}
              endContent={
                <div className="flex items-center">
                  <label className="sr-only" htmlFor="currency">
                    Currency
                  </label>
                  <select
                    aria-label="Select currency"
                    className="outline-none border-0 bg-transparent text-default-400 text-small"
                    defaultValue="USD"
                    id="currency"
                    name="currency"
                  >
                    <option aria-label="COP" value="COP">
                      COP
                    </option>
                  </select>
                </div>
              }
            />
          </Tab>
          <Tab key="installments" title="Pago en cuotas">
            <div className="flex flex-col gap-4">
              <NumberInput
                isDisabled
                name="installmentPrice"
                label="Precio total"
                isRequired
                size="sm"
                min={1}
                max={12}
                endContent={
                  <div className="flex items-center">
                    <label className="sr-only" htmlFor="currency">
                      Currency
                    </label>
                    <select
                      aria-label="Select currency"
                      className="outline-none border-0 bg-transparent text-default-400 text-small"
                      defaultValue="USD"
                      id="currency"
                      name="currency"
                    >
                      <option aria-label="COP" value="COP">
                        COP
                      </option>
                    </select>
                  </div>
                }
              />
              <Slider
                classNames={{
                  mark: "whitespace-nowrap last:after:mr-10",
                }}
                defaultValue={7}
                label="Promesa de pago"
                size="sm"
                getValue={(days) => `${days} Dias`}
                minValue={1}
                maxValue={180}
                isDisabled
                marks={[
                  { value: 14, label: "Quincenal" },
                  { value: 30, label: "Mensual" },
                  { value: 90, label: "Trimestral" },
                  { value: 180, label: "Semestral" },
                ]}
              />
              <Slider
                classNames={{
                  mark: "whitespace-nowrap last:after:mr-8",
                }}
                defaultValue={6}
                label="Cantidad de cuotas"
                size="sm"
                getValue={(installment) => `${installment} Cuotas`}
                minValue={2}
                maxValue={48}
                isDisabled
              />
            </div>
          </Tab>
        </Tabs>
      </section>
      <section className="p-2 border rounded-xl w-full flex gap-2">
        <Button
          className="text-sm tracking-tight font-medium"
          variant="flat"
          size="sm"
          startContent={<Storefront size={18} weight="duotone" />}
          isDisabled
        >
          Transversal 91
        </Button>
        <Button
          color="primary"
          className="text-sm tracking-tight font-medium"
          variant="flat"
          size="sm"
          startContent={<MapPinPlus size={18} weight="duotone" />}
          isDisabled
        >
          Añadir ubicación
        </Button>
      </section>
    </Form>
  );
}
