interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

interface UserViewModelDTO {
  id: string;
  name: string;
  email: string;
  role: string;
  validated: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

export type { CreateUserDTO, UserViewModelDTO };
