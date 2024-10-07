import { BaseFastifyRequest } from "./base";
import { CreateUserDTO } from "../../dtos/user/create-user";

type CreateUserRequest = BaseFastifyRequest<CreateUserDTO>;

export { CreateUserRequest };
