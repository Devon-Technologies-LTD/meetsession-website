import { TFullUser } from "@/lib/types";

export type TProfile = TFullUser;

export type TProfileResponse = {
  message: string;
  data: TProfile;
};
