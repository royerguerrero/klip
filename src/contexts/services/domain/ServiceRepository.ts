import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Service } from "./Service";

export abstract class ServiceRepository {
  abstract save(service: Service): Promise<void>;
  abstract matching(criteria: Criteria): Promise<Service[]>;
}
