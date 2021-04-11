export interface BaseContract {
  errors: any[];
  validate(model: any): boolean;
}
