export interface JwtService {
  generateAccessToken(userId: string): string;
  generateRefreshToken(userId: string): string;
  verifyAccessToken(token: string): Promise<unknown>;
  verifyRefreshToken(token: string): Promise<unknown>;
}
