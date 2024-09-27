import { BaseEntity } from "./base";
import { Email } from "../value-objects/email";
import { Name } from "../value-objects/name";
import { Password } from "../value-objects/password";
import { ValidationExecption } from "../exceptions/validation";
import { UserRole } from "../enums/role";
import { Validator } from "../shared/utils/validator";

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User extends BaseEntity {
  private _name: Name;
  private readonly _email: Email;
  private _password: Password;
  private _role: UserRole;
  private _validatedEmail: boolean;
  private _validator: Validator<UserProps> = new Validator(ValidationExecption);

  constructor(props: UserProps) {
    super();

    this._validate(props);

    const { name, email, password } = props;

    this._name = new Name(name);
    this._email = new Email(email);
    this._password = new Password(password);
    this._role = UserRole.User;
    this._validatedEmail = false;
  }

  get name(): string {
    return this._name.value;
  }

  set name(name: string) {
    this._name = this._validateAndCreateName(name);
  }

  get email(): string {
    return this._email.value;
  }

  get validatedEmail(): boolean {
    return this._validatedEmail;
  }

  set validatedEmail(validated: boolean) {
    this._validatedEmail = validated;
    this._updatedTimestamp();
  }

  set password(password: string) {
    this._password = this._validateAndCreatePassword(password);
  }

  get role(): UserRole {
    return this._role;
  }

  set role(role: UserRole) {
    this._role = role;
    this._updatedTimestamp();
  }

  public passwordMatches(password: string): boolean {
    return this._password.compare(password);
  }

  private _validateAndCreateName(name: string): Name {
    const newName = new Name(name);

    this._validator.validateSingle("name", name, Name.validate);
    this._updatedTimestamp();

    return newName;
  }

  private _validateAndCreatePassword(password: string): Password {
    const newPassword = new Password(password);

    this._validator.validateSingle("password", password, Password.validate);
    this._updatedTimestamp();

    return newPassword;
  }

  private _validate(props: UserProps): void {
    this._validator.validate(props, {
      name: Name.validate,
      email: Email.validate,
      password: Password.validate,
    });
  }
}
