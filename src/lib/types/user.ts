import { TTokens, TUser } from "../schemas";

export type TStatus = "ACTIVE" | "INACTIVE";
export type TUserSnapshot = {
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
};
export type TUserType = "USER" | "ADMIN" | "PLATFORM_ADMIN";

export type TFullUser = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  gender: string;
  date_of_birth: string;
  user_type: TUserType;
  status: TStatus;
  profile_image: string;
  app_version: string;
  created_at: string;
  updated_at: string;
  created_by: TUserSnapshot;
  updated_by: TUserSnapshot;
};

export type TLoginResponse = {
  token: TTokens;
  user_details: TUser;
};

export type TResentOTPResponse = {
  message: string; // OTP sent successfullly
  data: null;
};

export type TVerifyTokenResponse = {
  message: string;
  data: Pick<TFullUser, "id" | "first_name" | "last_name" | "email" | "status">;
  token: string;
};
