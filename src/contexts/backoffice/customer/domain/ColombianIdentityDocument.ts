import { ValueObject } from "@/contexts/shared/domain/value-object/ValueObject";

export enum IdentityDocumentType {
  TI = "Tarjeta de identidad",
  CC = "Cédula de Ciudadanía",
  PP = "Pasaporte",
  PPT = "Permiso de protección temporal",
}

export class ColombianIdentityDocument implements ValueObject {
  constructor(
    readonly type: IdentityDocumentType,
    readonly number: string,
  ) {}

  toString(): string {
    return `${this.type} ${this.number}`;
  }
}
