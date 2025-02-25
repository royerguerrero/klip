import { OnlineServiceId } from "./OnlineServiceId";
import { URL } from "url";
import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export class OnlineService implements ValueObject {
  constructor(readonly meetingLink: URL) {}
}
