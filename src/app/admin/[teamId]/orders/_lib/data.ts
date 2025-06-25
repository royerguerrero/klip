import { Order } from "./types";

export async function listOrders(): Promise<Order[]> {
  return [
    {
      id: "1",
      customerId: "1",
      serviceId: "1",
      onboardingId: "1",
      externalInvoiceId: "INV-001",
      paymentId: "PAY-001",
      externalReciptId: "REC-001",
      teamId: "1",
    },
    {
      id: "2",
      customerId: "2",
      serviceId: "2",
      onboardingId: "2",
      externalInvoiceId: "INV-002",
      paymentId: "PAY-002",
      externalReciptId: "REC-002",
      teamId: "1",
    },
    {
      id: "3",
      customerId: "3",
      serviceId: "3",
      onboardingId: "3",
      externalInvoiceId: "INV-003",
      paymentId: "PAY-003",
      externalReciptId: "REC-003",
      teamId: "1",
    },
  ];
}

export async function retrieveOrder(
  orderId: string
): Promise<Order | null> {
  const orders = await listOrders();
  return orders.find((order) => order.id === orderId) ?? null;
} 