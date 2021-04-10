export class Flunt {
  constructor(public errors: any[] = []) {}

  public isRequired(value, message) {
    if (!value || value.length <= 0) {
      this.errors.push(message);
    }
  }

  public hasMinLen(value, min, message) {
    if (!value || value.length < min) {
      this.errors.push(message);
    }
  }

  public hasMaxLen(value, max, message) {
    if (!value || value.length > max) {
      this.errors.push(message);
    }
  }

  public isFixedLen(value, len, message) {
    if (value.length !== len) {
      this.errors.push(message);
    }
  }

  public isEmail(value, message) {
    const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value)) {
      this.errors.push(message);
    }
  }

  public isNotNull(value, message) {
    if (!value.length) {
      this.errors.push(message);
    }
  }

  public isGreaterThan(valueA, valueB, message) {
    if (valueA > valueB) {
      this.errors.push(message);
    }
  }

  public clear() {
    this.errors = [];
  }

  public isValid() {
    return this.errors.length === 0;
  }
}
