import { NodePgDatabase } from "drizzle-orm/node-postgres";

export class DrizzleRepository {
  constructor(protected connection: NodePgDatabase) {}
}
