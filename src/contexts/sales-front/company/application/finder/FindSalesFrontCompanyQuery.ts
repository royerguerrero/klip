import { Query } from "@/contexts/shared/application/Query";

export class FindSalesFrontCompanyQuery implements Query {
  constructor(readonly subdomain: string) {}
}
