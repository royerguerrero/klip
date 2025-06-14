export type Service = {
  id: string;
  title: string;
  description: string;
  pricing: {
    amount: number;
    currency: string;
  };
  sessions: {
    amount: number;
    duration: number;
  };
};
