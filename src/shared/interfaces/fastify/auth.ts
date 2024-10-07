import { RefreshTokenRequestDTO, SignInRequestDTO } from "../../dtos/auth/auth";
import { BaseFastifyRequest } from "./base";

type SignInRequest = BaseFastifyRequest<SignInRequestDTO>;
type RefreshTokenRequest = BaseFastifyRequest<RefreshTokenRequestDTO>;

export type { SignInRequest, RefreshTokenRequest };
