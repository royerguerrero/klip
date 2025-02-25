import { Service } from "../domain/Service";

export interface ServiceResponseDTO {
  id: string;
  title: string;
  description: string;
}

export class ServiceResponse {
  public readonly service: ServiceResponseDTO;

  constructor(service: Service) {
    this.service = service.toPrimitives();
  }
}
