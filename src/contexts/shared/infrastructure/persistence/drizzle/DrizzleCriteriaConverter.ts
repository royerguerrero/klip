import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Filter } from "@/contexts/shared/domain/criteria/Filter";
import { Operator } from "@/contexts/shared/domain/criteria/Operator";
import { Column, eq, ne, gt, gte, lt, lte, SQLWrapper } from "drizzle-orm";

export class DrizzleCriteriaConverter {
  constructor(readonly dataMapper: Record<string, Column>) {}

  private parseFilter(filter: Filter): object | SQLWrapper | undefined {
    const column = this.dataMapper[filter.field];
    if (!column) {
      throw new Error(`Column mapping not found for field: ${filter.field}`);
    }

    switch (filter.operator) {
      case Operator.EQUAL:
        return eq(column, filter.value);
      case Operator.NOT_EQUAL:
        return ne(column, filter.value);
      case Operator.GREATER_THAN:
        return gt(column, filter.value);
      case Operator.GREATER_THAN_OR_EQUAL:
        return gte(column, filter.value);
      case Operator.LESS_THAN:
        return lt(column, filter.value);
      case Operator.LESS_THAN_OR_EQUAL:
        return lte(column, filter.value);
    }
  }

  convert(criteria: Criteria) {
    return criteria.filters.map((filter) => this.parseFilter(filter));
  }
}
