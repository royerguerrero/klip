import { Service } from "../domain/Service";

export interface ServiceResponseDTO {
  id: string;
  fingerprint: string;
  title: string;
  description: string;
  duration: {
    unit: "minutes" | "hours";
    value: number;
  };
  payment: {
    type: "onetime" | "subscription" | "installments";
    options: {};
  };
}

export class ServicesResponse {
  public readonly services: Array<ServiceResponseDTO>;

  constructor(services: Service[]) {
    this.services = services.map((service) => {
      const primitives = service.toPrimitives();
      return {
        ...primitives,
      };
    });
  }
}
