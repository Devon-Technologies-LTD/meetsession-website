import { createAuthService } from "./auth-service";
import { SECRET_KEY } from "./constants";

export const auth = createAuthService({
  secret: SECRET_KEY,
});
