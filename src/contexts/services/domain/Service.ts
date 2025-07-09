import { AggregateRoot } from "@/contexts/shared/domain/AggregateRoot";
import { ServiceId } from "./ServiceId";
import { Sessions } from "./Sessions";
import { Money } from "@/contexts/shared/domain/value-object/Money";
import { ServiceStatus } from "./ServiceStatus";
import { Category } from "./Category";
import { TeamId } from "@/contexts/organizations/domain/TeamId";

export class Service implements AggregateRoot {
  constructor(
    public readonly id: ServiceId,
    public readonly name: string,
    public readonly category: Category | null,
    public readonly description: string,
    public readonly sessions: Sessions,
    public readonly price: Money,
    public readonly status: ServiceStatus,
    public readonly teamId: TeamId
  ) {}

  static create(
    params: Omit<ReturnType<Service["toPrimitives"]>, "status">
  ): Service {
    return new Service(
      new ServiceId(params.id),
      params.name,
      params.category && params.subcategory
        ? new Category(params.category, params.subcategory)
        : null,
      params.description,
      new Sessions(params.sessions.amount, params.sessions.duration),
      new Money(params.price.amount, params.price.currency),
      new ServiceStatus(ServiceStatus.DRAFT),
      new TeamId(params.teamId)
    );
  }

  edit(
    params: Partial<Omit<ReturnType<Service["toPrimitives"]>, "id">>
  ): Service {
    return new Service(
      this.id,
      params.name ?? this.name,
      params.category && params.subcategory
        ? new Category(params.category, params.subcategory)
        : this.category,
      params.description ?? this.description,
      new Sessions(
        params.sessions?.amount ?? this.sessions.amount,
        params.sessions?.duration ?? this.sessions.duration
      ),
      new Money(
        params.price?.amount ?? this.price.amount,
        params.price?.currency ?? this.price.currency
      ),
      new ServiceStatus(params.status ?? this.status.value),
      new TeamId(params.teamId ?? this.teamId.value)
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name,
      category: this.category?.category ?? null,
      subcategory: this.category?.subcategory ?? null,
      description: this.description,
      sessions: {
        amount: this.sessions.amount,
        duration: this.sessions.duration,
      },
      price: {
        amount: this.price.amount,
        currency: this.price.currency,
      },
      status: this.status.value,
      teamId: this.teamId.value,
    };
  }

  static fromPrimitives(
    primitives: ReturnType<Service["toPrimitives"]>
  ): Service {
    return new Service(
      new ServiceId(primitives.id),
      primitives.name,
      primitives.category && primitives.subcategory
        ? new Category(primitives.category, primitives.subcategory)
        : null,
      primitives.description,
      new Sessions(primitives.sessions.amount, primitives.sessions.duration),
      new Money(primitives.price.amount, primitives.price.currency),
      new ServiceStatus(primitives.status),
      new TeamId(primitives.teamId)
    );
  }
}
