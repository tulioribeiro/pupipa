interface CreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponseDTO {
  id: string;
  name: string;
  email: string;
  validatedEmail: boolean;
  createdAt: Date;
}

export { CreateUserRequestDTO, CreateUserResponseDTO };
