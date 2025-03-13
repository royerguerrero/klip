import { CommandHandler } from "@/contexts/shared/application/CommandHandler";
import { EditCustomerCommand } from "./EditCustomerCommand";
import { CustomerEditor } from "./CustomerEditor";

export class EditCustomerCommandHandler
  implements CommandHandler<EditCustomerCommand>
{
  constructor(private editor: CustomerEditor) {}

  subscribedTo() {
    return EditCustomerCommand;
  }

  async handle(command: EditCustomerCommand): Promise<void> {
    this.editor.edit({
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
