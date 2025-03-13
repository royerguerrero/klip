import { CommandHandler } from "@/contexts/shared/application/CommandHandler";
import { RegisterCustomerCommand } from "./RegisterCustomerCommand";
import { CustomerRegistrar } from "./CustomerRegistrar";

export class RegisterCustomerCommandHandler
  implements CommandHandler<RegisterCustomerCommand>
{
  constructor(private registrar: CustomerRegistrar) {}

  subscribedTo() {
    return RegisterCustomerCommand;
  }

  async handle(command: RegisterCustomerCommand): Promise<void> {
    this.registrar.registrar({
      id: command.id,
      firstName: command.firstName,
      lastName: command.lastName,
      dob: command.dob,
      identityDocumentType: command.identityDocumentType,
      identityDocumentNumber: command.identityDocumentNumber,
      phoneNumber: command.phoneNumber,
      companyId: command.companyId,
    });
  }
}
