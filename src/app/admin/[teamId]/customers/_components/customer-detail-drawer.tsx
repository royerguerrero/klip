"use client";

import { CustomerResponseDTO } from "@/contexts/backoffice/customer/application/CustomersResponse";
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { DotsThree, User as UserIcon } from "@phosphor-icons/react/dist/ssr";
import EditCustomerModal from "./edit-customer-modal";
import { CardDetail } from "@/app/admin/_components/card-detail";

type Props = {
  customer: CustomerResponseDTO;
};

export function CustomerDetailDrawer({ customer }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onOpenChange: modalOnOpenChange,
  } = useDisclosure();

  // TODO: Check for useCallback here for performance
  return (
    <>
      <Button
        size="sm"
        variant="flat"
        radius="full"
        onPress={onOpen}
        className="text-sm tracking-tight font-medium"
      >
        Detalle
      </Button>
      <Drawer
        classNames={{
          base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2 rounded-medium",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1 tracking-tight">
                Detalle del cliente
              </DrawerHeader>
              <DrawerBody className="px-3 gap-4">
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    classNames={{
                      base: "bg-neutral-200",
                      icon: "text-neutral-400",
                    }}
                    className="w-20 h-20 text-lg"
                    icon={<UserIcon size={34} weight="fill" />}
                  />
                  <h2 className="text-lg text-balance font-semibold tracking-tight w-1/2 text-center leading-5">
                    {customer.firstName} {customer.lastName}
                  </h2>
                </div>
                <CardDetail
                  title="Detalles"
                  action={
                    <>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button
                            className="w-5 h-5 p-0 rounded-md"
                            variant="light"
                            size="sm"
                            isIconOnly
                          >
                            <DotsThree
                              className="text-neutral-500"
                              size={18}
                              weight="bold"
                            />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Customer actions">
                          <DropdownItem key="edit" onPress={modalOnOpen}>
                            Editar
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <EditCustomerModal
                        customer={customer}
                        isOpen={modalIsOpen}
                        onOpenChange={modalOnOpenChange}
                      />
                    </>
                  }
                >
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-neutral-500">Nombre</span>
                      <span className="font-medium">{customer.firstName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-neutral-500">Apellidos</span>
                      <span className="font-medium">{customer.lastName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-neutral-500">
                        Tipo de Documento
                      </span>
                      <span className="font-medium">
                        {customer.identityDocument.type}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-neutral-500">
                        Numero de Documento
                      </span>
                      <span className="font-medium">
                        {customer.identityDocument.documentNumber}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-neutral-500">
                        Fecha de Nacimiento
                      </span>
                      <span className="font-medium">
                        {customer.dateOfBirth.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-neutral-500">
                        Numero Telefónico
                      </span>
                      <span className="font-medium">
                        {`${customer.phoneNumber.prefix} ${customer.phoneNumber.number}`}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-neutral-500">Fecha de ingreso</span>
                      <span className="font-medium">{customer.createdAt}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-neutral-500">
                        Ultima actualización
                      </span>
                      <span className="font-medium">{customer.updatedAt}</span>
                    </div>
                  </div>
                </CardDetail>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
