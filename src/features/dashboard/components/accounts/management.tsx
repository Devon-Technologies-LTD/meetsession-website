import {
  BellRingIcon,
  CircleAlertIcon,
  CircleUserRoundIcon,
  CrownIcon,
  HeadsetIcon,
  LockKeyholeIcon,
  ToggleRightIcon,
} from "lucide-react";
import { Tile } from "../tiles";
import { CaretRightIcon } from "@/components/icons/caret-right-icon";
import { LogoutButton } from "@/components/ui/logout-button";
import { getUser } from "../../server/actions";
import Link from "next/link";
import { ProfileImage } from "@/components/ui/profile-image";
import { ManageAccountIcon } from "@/components/icons/manage-account-icon";

export async function Management() {
  const user = await getUser();

  return (
    <div className="flex flex-col gap-5 items-start w-full h-fit min-h-full">
      <Tile className="bg-brand-green-dark/10 w-full px-3.5 flex-row gap-2.5">
        <ProfileImage imageUrl={user?.profile_image} />

        <div className="w-fit text-start font-dm-sans flex flex-col gap-1">
          <p className="font-bold text-lg">
            {user?.first_name} {user?.last_name}
          </p>

          <p className="font-light text-sm">{user?.email}</p>

          <div className="flex items-center gap-2">
            <span className="text-brand-green">
              <CrownIcon className="w-6 h-6" />
            </span>
            <span className="text-xs w-fit h-fit py-1.5 px-2.5 bg-brand-green font-semibold text-white rounded-full">
              Pro Tier
            </span>
          </div>
        </div>
      </Tile>

      <div className="w-full h-fit flex flex-col gap-4">
        <p className="text-sm text-neutral-400 font-medium">
          Profile & Personal
        </p>
        <Tile className="bg-neutral-100">
          <Link href="/dashboard/accounts/edit">
            <Tile.TileItem
              prefixIcon={<CircleUserRoundIcon className="h-6 w-6" />}
              suffixIcon={<CaretRightIcon className="w-3 h-3" />}
            >
              <p className="text-sm font-semibold">Edit profile</p>
              <p className="text-xs text-neutral-500">Name, Email, Picture</p>
            </Tile.TileItem>
          </Link>

          <Tile.TileItem
            prefixIcon={<LockKeyholeIcon className="h-6 w-6" />}
            suffixIcon={<CaretRightIcon className="w-3 h-3" />}
          >
            <p className="text-sm font-semibold">Change Password</p>
            <p className="text-xs text-neutral-500">Update your password</p>
          </Tile.TileItem>
        </Tile>
      </div>

      <div className="w-full h-fit flex flex-col gap-4">
        <p className="text-sm text-neutral-400 font-medium">
          Subscription & Billing
        </p>
        <Tile className="bg-amber-100/80">
          <Link href="/dashboard/accounts/plans">
            <Tile.TileItem
              prefixIcon={<ManageAccountIcon className="h-6 w-6" />}
              suffixIcon={<CaretRightIcon className="w-3 h-3" />}
            >
              <div className="w-full h-fit flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">Manage Account</p>
                  <p className="text-xs text-neutral-500">
                    Manage your subscription
                  </p>
                </div>
                <span className="whitespace-nowrap bg-yellow-600 text-white px-2 py-1 rounded-full text-[9px] font-semibold">
                  Pro Tier
                </span>
              </div>
            </Tile.TileItem>
          </Link>
        </Tile>
      </div>

      <div className="w-full h-fit flex flex-col gap-4">
        <p className="text-sm text-neutral-400 font-medium">App Preferences</p>
        <Tile className="bg-neutral-100">
          <Tile.TileItem
            prefixIcon={<BellRingIcon className="h-6 w-6" />}
            suffixIcon={<CaretRightIcon className="w-3 h-3" />}
          >
            <div className="w-full h-fit flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Notifications</p>
                <p className="text-xs text-neutral-500">
                  Pushed notifications enabled
                </p>
              </div>
              <ToggleRightIcon className="h-auto w-5 text-brand-green-light" />
            </div>
          </Tile.TileItem>
        </Tile>
      </div>

      <div className="w-full h-fit flex flex-col gap-4">
        <p className="text-sm text-neutral-400 font-medium">
          Support & Information
        </p>
        <Tile className="bg-neutral-100">
          <Tile.TileItem
            prefixIcon={<HeadsetIcon className="h-6 w-6" />}
            suffixIcon={<CaretRightIcon className="w-3 h-3" />}
          >
            <p className="text-sm font-semibold">Help & Support</p>
            <p className="text-xs text-neutral-500">
              Contact us with questions
            </p>
          </Tile.TileItem>
          <Tile.TileItem
            prefixIcon={<CircleAlertIcon className="h-6 w-6" />}
            suffixIcon={<CaretRightIcon className="w-3 h-3" />}
          >
            <p className="text-sm font-semibold">About MeetSession</p>
            <p className="text-xs text-neutral-500">Know more about our app</p>
          </Tile.TileItem>
          <Tile.TileItem>
            <div className="p-3.5 rounded-lg bg-neutral-900 text-white flex items-center justify-between">
              <p className="text-sm font-semibold">Contact Support</p>
              <CaretRightIcon className="h-3 w-3" />
            </div>
          </Tile.TileItem>
        </Tile>
      </div>

      <p className="text-muted-foreground text-xs text-center w-full">
        &copy; 2025 MeetSession by Devon Technologies LTD.
      </p>

      <div className="w-full">
        <Tile className="bg-rose-700 hover:bg-rose-600 transition-colors text-white p-0 overflow-hidden">
          <LogoutButton />
        </Tile>
      </div>
    </div>
  );
}
