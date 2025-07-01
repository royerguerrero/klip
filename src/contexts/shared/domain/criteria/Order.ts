export enum OrderOption {
  ASC = "ASC",
  DESC = "DESC",
}

export class Order {
  constructor(readonly field: string, readonly direction: OrderOption) {}
}
