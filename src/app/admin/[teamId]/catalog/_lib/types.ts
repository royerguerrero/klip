export type Service = {
  id: string;
  name: string;
  description: string;
  category: string | null;
  subcategory: string | null;
  sessions: {
    amount: number;
    duration: number;
  };
  price: {
    amount: number;
    currency: string;
  };
  status: string;
  teamId: string;
}; 