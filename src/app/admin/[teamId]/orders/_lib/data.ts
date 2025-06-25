import { Order } from "./types";

export async function listOrders(): Promise<Order[]> {
  return [
    {
      id: "1",
      customer: {
        id: "1",
        name: "Juan Pérez",
        email: "juan.perez@example.com",
        phone: "+51 999 999 999",
      },
      services: [
        {
          id: "1",
          name: "Servicio Básico",
          price: 150.0,
        },
      ],
      payment: {
        id: "PAY-001",
        status: "paid",
      },
      status: "completed",
      createdAt: "2024-01-15T10:30:00Z",
      teamId: "1",
      total: 150.0,
    },
    {
      id: "2",
      customer: {
        id: "2",
        name: "Pedro García",
        email: "pedro.garcia@example.com",
        phone: "+51 888 888 888",
      },
      services: [
        {
          id: "2",
          name: "Servicio Premium",
          price: 89.99,
        },
      ],
      payment: {
        id: "PAY-002",
        status: "pending",
      },
      status: "confirmed",
      createdAt: "2024-01-16T14:45:00Z",
      teamId: "1",
      total: 89.99,
    },
    {
      id: "3",
      customer: {
        id: "3",
        name: "María López",
        email: "maria.lopez@example.com",
        phone: "+51 777 777 777",
      },
      services: [
        {
          id: "3",
          name: "Servicio VIP",
          price: 299.5,
        },
      ],
      payment: {
        id: "PAY-003",
        status: "paid",
      },
      status: "pending",
      createdAt: "2024-01-17T09:15:00Z",
      teamId: "1",
      total: 299.5,
    },
  ];
}

export async function retrieveOrder(orderId: string): Promise<Order | null> {
  const orders = await listOrders();
  return orders.find((order) => order.id === orderId) ?? null;
}
