import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { ServiceId } from "./ServiceId";
import { ServiceTitle } from "./ServiceTitle";
import { ServiceDescription } from "./ServiceDescription";
import { ServiceDetail } from "./ServiceDetail";

export class Service extends AggregateRoot {
  constructor(
    readonly id: ServiceId,
    readonly title: ServiceTitle,
    readonly description: ServiceDescription,
    readonly detail: ServiceDetail
  ) {
    super();
  }

  toPrimitives() {
    return {
      id: this.id.value,
      title: this.title,
      description: this.description,
      detail: this.detail,
    };
  }
}
