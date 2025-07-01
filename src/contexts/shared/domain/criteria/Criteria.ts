import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { Order } from "@/contexts/shared/domain/criteria/Order";

export class Criteria {
  constructor(
    readonly filters: Filter[],
    readonly order?: Order,
    readonly limit: number = 0,
    readonly offset: number = 0
  ) {}
}
