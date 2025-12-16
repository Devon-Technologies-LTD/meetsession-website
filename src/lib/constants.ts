export const BASE_URL =
  (process.env.BASE_URL as string) ||
  (process.env.NEXT_PUBLIC_BASE_URL as string) ||
  ("localhost:3000/api/v1" as string);
export const SECRET_KEY = (process.env.SECRET_KEY as string) || "my-secret-key";
export const ALGORITHM = (process.env.ALGORITHM as string) || "HS256";