import { Customer } from "../domain/Customer";
import { CustomerRepository } from "../domain/CustomerRepository";

export class CustomerAdder {
  constructor(private readonly repository: CustomerRepository) {}

  async add(
    params: Omit<ReturnType<Customer["toPrimitives"]>, "addedAt" | "status">
  ): Promise<{ error: Error | null; customer: Customer | null }> {
    try {
      console.log("params in adder", params);
      const customer = Customer.create(params);
      await this.repository.save(customer);

      return { error: null, customer };
    } catch (error) {
      return { error: error as Error, customer: null };
    }
  }
}
