import { InPersonService } from "../../domain/modality/InPersonService";
import { OnlineService } from "../../domain/modality/OnlineService";
import { Onboarding } from "../../domain/onboarding/Onboarding";
import { InstallmentsPayment } from "../../domain/payment/installments/InstallmentsPayment";
import { OnetimePayment } from "../../domain/payment/onetime/OnetimePayment";
import { SubscriptionPayment } from "../../domain/payment/subscription/SubscriptionPayment";
import { Service } from "../../domain/Service";
import { ServiceDescription } from "../../domain/ServiceDescription";
import { ServiceDetail } from "../../domain/ServiceDetail";
import { ServiceId } from "../../domain/ServiceId";
import { ServiceRepository } from "../../domain/ServiceRepository";
import { ServiceTitle } from "../../domain/ServiceTitle";
import { GroupalService } from "../../domain/type/groupal/GroupalService";
import { IndividualService } from "../../domain/type/individual/IndividualService";
import { ServiceProvider } from "../../domain/ServiceProvider";

export class ServiceCreator {
  constructor(private repository: ServiceRepository) {}

  create(params: {
    id: ServiceId;
    title: ServiceTitle;
    description: ServiceDescription;
    detail: ServiceDetail;
    type: InPersonService | OnlineService;
    modality: IndividualService | GroupalService;
    payment: OnetimePayment | SubscriptionPayment | InstallmentsPayment;
    onboarding: Onboarding;
    providers: ServiceProvider[];
  }) {
    const service = new Service(
      params.id,
      params.title,
      params.description,
      params.detail,
      params.type,
      params.modality,
      params.payment,
      params.onboarding,
      params.providers
    );
    this.repository.save(service);
  }
}
