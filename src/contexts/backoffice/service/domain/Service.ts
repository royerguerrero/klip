import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { ServiceId } from "./ServiceId";
import { ServiceTitle } from "./ServiceTitle";
import { ServiceDescription } from "./ServiceDescription";
import { ServiceDetail } from "./ServiceDetail";
import { OnetimePayment } from "./payment/onetime/OnetimePayment";
import { SubscriptionPayment } from "./payment/subscription/SubscriptionPayment";
import { InPersonService } from "./modality/InPersonService";
import { OnlineService } from "./modality/OnlineService";
import { InstallmentsPayment } from "./payment/installments/InstallmentsPayment";
import { Onboarding } from "./onboarding/Onboarding";
import { ServiceProvider } from "./ServiceProvider";
import { GroupalService } from "./type/groupal/GroupalService";
import { IndividualService } from "./type/individual/IndividualService";

export class Service extends AggregateRoot {
  constructor(
    readonly id: ServiceId,
    readonly title: ServiceTitle,
    readonly description: ServiceDescription,
    readonly detail: ServiceDetail,
    readonly modality: InPersonService | OnlineService,
    readonly type: GroupalService | IndividualService,
    readonly payment:
      | OnetimePayment
      | SubscriptionPayment
      | InstallmentsPayment,
    readonly onboarding: Onboarding,
    readonly providers: ServiceProvider
  ) {
    super();
  }

  static create(
    id: ServiceId,
    title: ServiceTitle,
    description: ServiceDescription,
    detail: ServiceDetail,
    modality: InPersonService | OnlineService,
    type: IndividualService | GroupalService,
    payment: OnetimePayment | SubscriptionPayment | InstallmentsPayment,
    onboarding: Onboarding,
    providers: ServiceProvider
  ): Service {
    return new Service(
      id,
      title,
      description,
      detail,
      modality,
      type,
      payment,
      onboarding,
      providers
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this.title.value,
      description: this.description.value,
      detail: this.detail.value,
    };
  }
}
