import { BackAction } from "@/components/back-button";
import { ChangePassword } from "@/features/dashboard/components/accounts/ChangePassword/change_password";
// import { retrieveProfileAction } from "@/features/dashboard/server/actions";

export default async function Page() {
  return (
    <div className="px-2 flex flex-col gap-6 w-full h-full">
      <BackAction name="Update Password" />
      <ChangePassword />
    </div>
  );
}
