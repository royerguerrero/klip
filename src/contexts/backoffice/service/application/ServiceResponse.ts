import { Service } from "../domain/Service";

export interface ServiceResponseDTO {
  id: string;
  title: string;
  description: string;
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
