"use client";

import { signoutAction } from "@/server/actions";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export function LogoutButton() {
  const [state, action, loading] = useActionState(signoutAction, undefined);
  const router = useRouter();
  useEffect(() => {
    if (state) {
      if (state?.success) {
        toast.success("You're signed out");
        router.push("/signin");
      }
    }
  }, [state]);

  return (
    <form
      action={action}
      className="w-full h-full flex items-center justify-center bg-inherit"
    >
      <button
        disabled={loading}
        className="hover:cursor-pointer w-full h-full p-4 flex items-center justify-center gap-2 text-sm font-semibold relative overflow-hidden bg-inherit"
      >
        {loading && (
          <span className="absolute top-0 left-0 h-full w-full bg-inherit flex items-center justify-center">
            <Loader2Icon className="w-4 h-4 animate-spin" />
          </span>
        )}
        <LogOutIcon className="w-4 h-4" />
        <p>Sign Out</p>
      </button>
    </form>
  );
}
