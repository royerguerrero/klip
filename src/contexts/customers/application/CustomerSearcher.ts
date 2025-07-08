import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { CustomerRepository } from "../domain/CustomerRepository";
import { Customer } from "../domain/Customer";
import { Operator } from "@/contexts/shared/domain/criteria/Operator";

export class CustomerSearcher {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async search(teamId: string): Promise<{
    error: Error | null;
    customers: Customer[] | null;
  }> {
    const customers = await this.customerRepository.matching(
      new Criteria([new Filter("teamId", Operator.EQUAL, teamId)])
    );
    return { error: null, customers };
  }
}
