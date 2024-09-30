export interface UserPersistenceData {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "user";
  validated: boolean;
  createdAt: Date;
  updatedAt: Date;
}
