import { retrieveOrder } from "../_lib/data";
import { formatOrderId } from "@/app/_lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/app/_components/ui/badge";

type Props = {
  params: Promise<{
    id: string;
    teamId: string;
  }>;
};

// Helper function to get payment status badge
const getPaymentStatusBadge = (status: string) => {
  const variants = {
    pending: "secondary",
    paid: "default",
    failed: "destructive",
    refunded: "outline",
  } as const;

  return (
    <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
      {status === "pending" && "Pendiente"}
      {status === "paid" && "Pagado"}
      {status === "failed" && "Fallido"}
      {status === "refunded" && "Reembolsado"}
    </Badge>
  );
};

// Helper function to get order status badge
const getOrderStatusBadge = (status: string) => {
  const variants = {
    pending: "secondary",
    confirmed: "default",
    completed: "default",
    cancelled: "destructive",
  } as const;

  return (
    <Badge variant={variants[status as keyof typeof variants] || "secondary"}>
      {status === "pending" && "Pendiente"}
      {status === "confirmed" && "Confirmado"}
      {status === "completed" && "Completado"}
      {status === "cancelled" && "Cancelado"}
    </Badge>
  );
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  const order = await retrieveOrder(id);

  if (!order) {
    return (
      <div className="px-4 py-8 text-center">
        <h2 className="text-xl font-semibold text-muted-foreground">
          Orden no encontrada
        </h2>
      </div>
    );
  }

  return (
    <>
      <section className="px-4 grid grid-cols-5 gap-3">
        <article className="border rounded-lg p-3 col-span-2">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">
            Detalles de la Orden #{formatOrderId(order.id)}
          </h3>
          <div className="space-y-2">
            <div>
              <span className="text-xs text-muted-foreground">Cliente:</span>
              <p className="text-sm font-medium">{order.customer.name}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Email:</span>
              <p className="text-sm font-medium">{order.customer.email}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Teléfono:</span>
              <p className="text-sm font-medium">{order.customer.phone}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Servicios:</span>
              <p className="text-sm font-medium">
                {order.services.length} servicios
              </p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Total:</span>
              <p className="text-sm font-medium">${order.total.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Fecha:</span>
              <p className="text-sm font-medium">
                {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm", {
                  locale: es,
                })}
              </p>
            </div>
          </div>
        </article>
        <article className="border rounded-lg p-3">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">
            Estado
          </h3>
          <div className="flex items-center gap-2">
            {getOrderStatusBadge(order.status)}
          </div>
        </article>
        <article className="border rounded-lg p-3">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">
            Pago
          </h3>
          <div className="flex items-center gap-2">
            {getPaymentStatusBadge(order.payment.status)}
          </div>
        </article>
        <article className="border rounded-lg p-3">
          <h3 className="font-medium text-sm text-muted-foreground mb-2">
            ID de Pago
          </h3>
          <p className="text-sm font-mono">{order.payment.id}</p>
        </article>
      </section>
      <section className="px-4 flex flex-col gap-4">
        <h2 className="font-semibold text-secondary-foreground">Servicios</h2>
        <div className="border rounded-lg p-4">
          <div className="space-y-3">
            {order.services.map((service) => (
              <div
                key={service.id}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ID: {service.id}
                  </p>
                </div>
                <p className="font-medium">${service.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-4 flex flex-col gap-4">
        <h2 className="font-semibold text-secondary-foreground">Actividad</h2>
        <div className="border rounded-lg p-4 text-center text-muted-foreground">
          Tabla de actividad
        </div>
      </section>
    </>
  );
}
