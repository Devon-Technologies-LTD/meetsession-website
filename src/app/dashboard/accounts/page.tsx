import { BackAction } from "@/components/back-button";
import { Management } from "@/features/dashboard/components/accounts/management";

export default function Page() {
  return (
    <div className="px-2 flex flex-col gap-6 w-full h-full">
      <BackAction name="Account management" />

      <div className="py-7 w-full">
        <Management />
      </div>
    </div>
  );
}
