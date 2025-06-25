export type Order = {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  services: [{
    id: string;
    name: string;
    price: number;
  }];
  payment: {
    id: string;
    status: "pending" | "paid" | "failed" | "refunded";
  };
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  teamId: string;
  total: number;
};
