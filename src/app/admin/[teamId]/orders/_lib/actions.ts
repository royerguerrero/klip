import { redirect } from "next/navigation";

export async function addOrder(order: Record<string, unknown>) {
  // TODO: Implement order creation
  console.log('Adding order:', order);
}

export async function editOrder(orderId: string, order: Record<string, unknown>) {
  // TODO: Implement order editing
  console.log('Editing order:', orderId, order);
}

export async function archiveOrder(orderId: string) {
  // TODO: Implement order archiving
  console.log('Archiving order:', orderId);
  const teamId = "1";
  redirect(`/admin/${teamId}/orders`);
} 