"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Icon } from "@iconify-icon/react";
import { changeServiceStatus } from "../_lib/actions";
import { useRouter } from "next/navigation";

interface StatusSelectProps {
  currentStatus: string;
  serviceId: string;
  teamId: string;
}

const statusOptions = [
  {
    value: "draft",
    label: "Borrador",
    icon: "ph:circle-dashed-bold",
    variant: "default" as const,
    description: "El servicio está en borrador y no es visible públicamente",
  },
  {
    value: "published",
    label: "Publicado",
    icon: "ph:globe-simple-fill",
    variant: "success" as const,
    description: "El servicio está publicado y visible para los clientes",
  },
  {
    value: "archived",
    label: "Archivado",
    icon: "ph:globe-simple-x-bold",
    variant: "warning" as const,
    description: "El servicio está archivado y no disponible",
  },
];

export function StatusSelect({
  currentStatus,
  serviceId,
  teamId,
}: StatusSelectProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const currentOption = statusOptions.find(
    (option) => option.value === currentStatus
  );
  const selectedOption = statusOptions.find(
    (option) => option.value === selectedStatus
  );

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === currentStatus) {
      setSelectedStatus(newStatus);
      return;
    }

    setPendingStatus(newStatus);
    setShowConfirmDialog(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!pendingStatus) return;

    setIsLoading(true);
    try {
      const result = await changeServiceStatus(
        serviceId,
        teamId,
        pendingStatus
      );

      if (result instanceof Error) {
        console.error("Error changing status:", result);
        // You might want to show a toast notification here
        setSelectedStatus(currentStatus);
      } else {
        setSelectedStatus(pendingStatus);
        router.refresh();
      }
    } catch (error) {
      console.error("Error changing status:", error);
      setSelectedStatus(currentStatus);
    } finally {
      setIsLoading(false);
      setShowConfirmDialog(false);
      setPendingStatus(null);
    }
  };

  const handleCancelStatusChange = () => {
    setSelectedStatus(currentStatus);
    setShowConfirmDialog(false);
    setPendingStatus(null);
  };

  return (
    <>
      <Select
        value={selectedStatus}
        onValueChange={handleStatusChange}
        disabled={isLoading}
      >
        <SelectTrigger className="max-h-6 bg-transparent gap-1 p-0" hideChevron>
          <SelectValue>
            <Badge variant={selectedOption?.variant || "secondary"}>
              <Icon
                icon={selectedOption?.icon || "ph:circle-dashed-bold"}
                height={14}
              />
              {selectedOption?.label || "Borrador"}
            </Badge>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <Badge variant={option.variant}>
                <Icon icon={option.icon} height={14} />
                {option.label}
              </Badge>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambiar estado del servicio</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres cambiar el estado del servicio de{" "}
              <strong>{currentOption?.label}</strong> a{" "}
              <strong>
                {
                  statusOptions.find((opt) => opt.value === pendingStatus)
                    ?.label
                }
              </strong>
              ?
              <br />
              <br />
              {
                statusOptions.find((opt) => opt.value === pendingStatus)
                  ?.description
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelStatusChange}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmStatusChange}
              disabled={isLoading}
            >
              {isLoading ? "Cambiando..." : "Confirmar cambio"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
