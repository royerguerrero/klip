import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { Operator } from "@/contexts/shared/domain/criteria/Operator";
import { CustomerRepository } from "../domain/CustomerRepository";
import { CustomerDoesNotExistError } from "../domain/errors/CustomerDoesNotExistError";

export class CustomerFinder {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async find(teamId: string, customerId: string) {
    const customers = await this.customerRepository.matching(
      new Criteria([
        new Filter("id", Operator.EQUAL, customerId),
        // new Filter("teamId", Operator.EQUAL, teamId),
      ])
    );

    if (customers.length === 0) {
      return {
        error: new CustomerDoesNotExistError(customerId),
        customer: null,
      };
    }
    return { error: null, customer: customers?.[0] ?? null };
  }
}
