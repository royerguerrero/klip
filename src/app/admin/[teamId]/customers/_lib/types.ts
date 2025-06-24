export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  document: {
    type: string;
    number: string;
  };
  email: string;
  phone: {
    prefix: string;
    number: string;
  };
  teamId: string;
};
