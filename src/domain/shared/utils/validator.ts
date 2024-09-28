type ValidatorFunction<T> = (value: T) => string[];

export class Validator<T> {
  #errorType: new (errors: Record<string, string[]>) => Error;

  constructor(errorType: new (errors: Record<string, string[]>) => Error) {
    this.#errorType = errorType;
  }

  validate<K extends keyof T>(
    props: Partial<T>,
    validators: Partial<Record<K, ValidatorFunction<T[K]>>>
  ): void {
    const errors: Record<string, string[]> = {};

    for (const key in validators) {
      const validate = validators[key];
      const propValue = props[key];

      if (validate && propValue !== undefined) {
        const validationErrors = validate(propValue);
        if (validationErrors.length) {
          errors[key] = validationErrors;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      throw new this.#errorType(errors);
    }
  }

  validateSingle<K extends keyof T>(
    key: K,
    value: T[K],
    validate: ValidatorFunction<T[K]>
  ): void {
    const errors = validate(value);
    if (errors.length > 0) {
      throw new this.#errorType({ [key]: errors });
    }
  }
}
