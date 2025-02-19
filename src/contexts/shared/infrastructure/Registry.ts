import { Query } from "@/contexts/shared/application/Query";
import { QueryHandler } from "@/contexts/shared/application/QueryHandler";
import { QueryResponse } from "@/contexts/shared/application/QueryResponse";

import { Command } from "../application/Command";
import { CommandHandler } from "../application/CommandHandler";

export class Registry {
  public readonly queryHandlers: Map<
    Query,
    QueryHandler<Query, QueryResponse>
  > = new Map();
  public readonly commandHandlers: Map<Command, CommandHandler<Command>> =
    new Map();
}
