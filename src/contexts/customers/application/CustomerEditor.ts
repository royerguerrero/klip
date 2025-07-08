import { Customer } from "../domain/Customer";
import { CustomerRepository } from "../domain/CustomerRepository";
import { CustomerDoesNotExistError } from "../domain/errors/CustomerDoesNotExistError";
import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { Operator } from "@/contexts/shared/domain/criteria/Operator";

export class CustomerEditor {
  constructor(private readonly repository: CustomerRepository) {}

  async edit(
    id: string,
    params: Omit<
      ReturnType<Customer["toPrimitives"]>,
      "addedAt" | "status" | "id"
    >
  ): Promise<{ error: Error | null; customer: Customer | null }> {
    const criteria = new Criteria([new Filter("id", Operator.EQUAL, id)]);
    const existingCustomers = await this.repository.matching(criteria);

    if (existingCustomers.length === 0) {
      return { error: new CustomerDoesNotExistError(id), customer: null };
    }

    const customer = existingCustomers[0].edit({
      ...params,
      status: existingCustomers[0].toPrimitives().status,
    });

    await this.repository.save(customer);

    return { error: null, customer };
  }
}
