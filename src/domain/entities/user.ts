import { BaseEntity } from "./base";
import { Email } from "../value-objects/email";
import { Name } from "../value-objects/name";
import { Password } from "../value-objects/password";
import { ValidationException } from "../exceptions/validation";
import { UserRole } from "../enums/role";
import { Validator } from "../shared/utils/validator";

export interface UserData {
  name: string;
  email: string;
  password: string;
  id?: string;
  validatedEmail?: boolean;
  role?: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends BaseEntity {
  #name: Name;
  readonly #email: Email;
  #password: Password;
  #role: UserRole;
  #validatedEmail: boolean;
  #validator = new Validator<UserData>(ValidationException);
  constructor(props: UserData) {
    super();

    this.#validate(props);

    const { name, email, password } = props;

    this.#name = new Name(name);
    this.#email = new Email(email);
    this.#password = Password.create(password);
    this.#role = UserRole.User;
    this.#validatedEmail = false;
  }

  get name(): string {
    return this.#name.value;
  }

  set name(name: string) {
    this.#name = this.#validateAndCreateName(name);
  }

  get email(): string {
    return this.#email.value;
  }

  get validatedEmail(): boolean {
    return this.#validatedEmail;
  }

  set validatedEmail(validated: boolean) {
    this.#validatedEmail = validated;
    this._updatedTimestamp();
  }

  set password(password: string) {
    this.#password = this.#validateAndCreatePassword(password);
  }

  get password(): string {
    return this.#password.value;
  }

  get role(): UserRole {
    return this.#role;
  }

  set role(role: UserRole) {
    this.#role = role;
    this._updatedTimestamp();
  }

  public passwordMatches(password: string): boolean {
    return this.#password.compare(password);
  }

  static fromData(data: UserData): User {
    return new User(data);
  }

  #validateAndCreateName(name: string): Name {
    const newName = new Name(name);

    this.#validator.validateSingle("name", name, Name.validate.bind(Name));
    this._updatedTimestamp();

    return newName;
  }

  #validateAndCreatePassword(password: string): Password {
    const newPassword = new Password(password);

    this.#validator.validateSingle(
      "password",
      password,
      Password.validate.bind(Password)
    );
    this._updatedTimestamp();

    return newPassword;
  }

  #validate(props: UserData): void {
    this.#validator.validate(props, {
      name: Name.validate.bind(Name),
      email: Email.validate.bind(Email),
      password: Password.validate.bind(Password),
    });
  }
}
