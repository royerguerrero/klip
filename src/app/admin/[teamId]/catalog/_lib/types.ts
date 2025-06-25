export type Service = {
  id: string;
  name: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  teamId: string;
}; 