import { Query } from "@/contexts/shared/application/Query";

export class ListCustomerQuery implements Query {
  constructor(
    readonly reader: {
      id: string;
      company: string;
    },
  ) {}
}
