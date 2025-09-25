import { BackAction } from "@/components/back-button";
import { EditProfile } from "@/features/dashboard/components/accounts/profiles/edit-profile";
import { retrieveProfileAction } from "@/features/dashboard/server/actions";

export default async function Page() {
  const result = await retrieveProfileAction();
  return (
    <div className="px-2 flex flex-col gap-6 w-full h-full">
      <BackAction name="Edit Profile" />

      {result.success ? (
        <EditProfile defaultValues={result.data.data} />
      ) : (
        <p>Failed to retrieve profile</p>
      )}
    </div>
  );
}
