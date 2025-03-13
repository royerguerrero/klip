import { Registry } from "@/contexts/shared/infrastructure/Registry";
import { FindSalesFrontCompanyQuery } from "../application/finder/FindSalesFrontCompanyQuery";
import { SalesFrontCompanyFinder } from "../application/finder/SalesFrontCompanyFinder";
import { FindSalesFrontCompanyQueryHandler } from "../application/finder/FindSalesFrontCompanyQueryHandler";
import { DrizzleSalesFrontCompanyRepository } from "./persistence/drizzle/DrizzleSalesFrontCompanyRepository";

export class SalesFrontCompanyRegistry extends Registry {
  public queryHandlers = [
    new FindSalesFrontCompanyQueryHandler(
      new SalesFrontCompanyFinder(new DrizzleSalesFrontCompanyRepository()),
    ),
  ];
}
