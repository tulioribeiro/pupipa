interface SignInRequestDTO {
  email: string;
  password: string;
}

interface SignInResponseDTO {
  accessToken: string;
  refreshAccessToken: string;
}

interface RefreshTokenRequestDTO {
  refreshToken: string;
}

interface RefreshTokenResponseDTO {
  accessToken: string;
}

export type {
  SignInRequestDTO,
  SignInResponseDTO,
  RefreshTokenRequestDTO,
  RefreshTokenResponseDTO,
};
