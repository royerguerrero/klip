import { Repository } from "@/contexts/shared/domain/Repository";
import { Service } from "./Service";

export class ServiceRepository extends Repository {
  save(service: Service) {}
}
