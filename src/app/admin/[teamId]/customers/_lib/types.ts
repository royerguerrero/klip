export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  document: {
    type: string;
    value: string;
  };
  dateBirth: Date;
  email: string;
  phone: {
    prefix: string;
    number: string;
  };
  teamId: string;
  addedAt?: Date;
  status: string;
};
