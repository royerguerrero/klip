"use client"

import { Button } from "@/app/_components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/_components/ui/drawer";
import { Icon } from "@iconify-icon/react";

interface ContactDrawerProps {
  phone?: string;
  email?: string;
  customerName?: string;
  children: React.ReactNode;
}

export function ContactDrawer({
  phone,
  email,
  customerName = "Cliente",
  children,
}: ContactDrawerProps) {
  const handleCall = () => {
    if (phone) {
      window.open(`tel:${phone}`, "_self");
    }
  };

  const handleWhatsApp = () => {
    if (phone) {
      const message = `Hola ${customerName}, ¿cómo estás?`;
      const whatsappUrl = `https://wa.me/${phone.replace(
        /\D/g,
        ""
      )}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  const handleEmail = () => {
    if (email) {
      window.open(`mailto:${email}`, "_self");
    }
  };

  const hasContactInfo = phone || email;

  if (!hasContactInfo) {
    return null;
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm px-3">
          <DrawerHeader className="px-1 flex-row justify-between items-center">
            <DrawerTitle>Contactar a {customerName}</DrawerTitle>
            <DrawerClose asChild>
              <Button
                size="icon"
                className="size-6 p-0 text-muted-foreground rounded-full"
              >
                <Icon icon="ph:x-bold" height={12} />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="mb-4">
            {phone && (
              <Button
                onClick={handleCall}
                className="w-full justify-start rounded-b-none font-medium border-b-0 h-11 text-muted-foreground"
                variant="outline"
                size="lg"
              >
                <Icon
                  icon="ph:phone-outgoing-fill"
                  height={20}
                />
                Llamar {phone}
              </Button>
            )}
            {phone && (
              <>
                <Button
                  onClick={handleWhatsApp}
                  className="w-full justify-start rounded-none font-medium h-11 text-muted-foreground"
                  variant="outline"
                  size="lg"
                >
                  <Icon
                    icon="ph:whatsapp-logo-fill"
                    height={20}
                  />
                  Chat de WhatsApp
                </Button>
              </>
            )}
            {email && (
              <>
                <Button
                  onClick={handleEmail}
                  className="w-full justify-start rounded-t-none font-medium border-t-0 h-11 text-muted-foreground"
                  variant="outline"
                  size="lg"
                >
                  <Icon
                    icon="ph:at-fill"
                    height={20}
                  />
                  {email}
                </Button>
              </>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
