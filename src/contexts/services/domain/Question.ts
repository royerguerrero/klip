import { Entity } from "@/contexts/shared/domain/Entity";
import { QuestionId } from "./QuestionId";

export type QuestionInputType =
  | "name"
  | "short text"
  | "long text"
  | "date"
  | "select"
  | "email"
  | "phone";

type SelectOptions = {
  label: string;
  value: string;
};

type DateOptions = {
  max: Date | null;
  min: Date | null;
};

export class Question implements Entity {
  constructor(
    public readonly id: QuestionId,
    public readonly label: string,
    public readonly inputType: QuestionInputType,
    public readonly required: boolean,
    public readonly order: number,
    public readonly options?: SelectOptions | DateOptions
  ) {}

  static fromPrimitives(
    primitives: ReturnType<Question["toPrimitives"]>
  ): Question {
    return new Question(
      new QuestionId(primitives.id),
      primitives.label,
      primitives.inputType,
      primitives.required,
      primitives.order,
      primitives.options as SelectOptions | DateOptions | undefined
    );
  }

  toPrimitives() {
    return {
      id: this.id.value,
      label: this.label,
      inputType: this.inputType,
      required: this.required,
      order: this.order,
      options: this.options as SelectOptions | DateOptions | undefined,
    };
  }
}
