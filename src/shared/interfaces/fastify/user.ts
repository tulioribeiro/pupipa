import { CreateUserRequestDTO } from "../../dtos/user/create-user";

interface BaseRequest<T> {
  Body: T;
}

type CreateUserRequest = BaseRequest<CreateUserRequestDTO>;

export { CreateUserRequest };
