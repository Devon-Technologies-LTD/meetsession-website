import { BackAction } from "@/components/back-button";
import { Management } from "@/features/dashboard/components/accounts/management";
import { getUser } from "@/features/dashboard/server/actions";

export default async function Page() {
  const user = await getUser();
  return (
    <div className="px-2 flex flex-col gap-6 w-full h-full">
      <BackAction name="Account management" />

      <div className="py-7 w-full">
        <Management
          userName={`${user?.first_name} ${user?.last_name}`}
          userEmail={user?.email}
          userImage={user?.profile_image}
        />
      </div>
    </div>
  );
}
