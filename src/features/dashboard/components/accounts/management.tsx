"use client";

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
import Link from "next/link";
import { ProfileImage } from "@/components/ui/profile-image";
import { ManageAccountIcon } from "@/components/icons/manage-account-icon";
import { useEffect } from "react";
import { useUserSubscription } from "@/context/use-user-subscription";

type TManagementProps = {
  userImage?: string;
  userName?: string;
  userEmail?: string;
};
export function Management(props: TManagementProps) {
  const { updateSubscription, subscription } = useUserSubscription();

  useEffect(() => {
    fetch(`/api/v1/subscription/current-subscription`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === "string") {
          updateSubscription(undefined);
        } else {
          updateSubscription(data);
        }
      })
      .catch((err) => {
        console.log({ err });
        updateSubscription(undefined);
      });
  }, [updateSubscription]);

  const planName = subscription?.plan_snapshot.name;

  return (
    <div className="flex flex-col gap-5 items-start w-full h-fit min-h-full">
      <Tile className="bg-brand-green-dark/10 w-full px-3.5 flex-row gap-2.5">
        <ProfileImage imageUrl={props?.userImage} />

        <div className="w-fit text-start font-dm-sans flex flex-col gap-1">
          <p className="font-bold text-lg">{props.userName}</p>

          <p className="font-light text-sm">{props.userEmail}</p>

          {planName && (
            <div className="flex items-center gap-2">
              <span className="text-brand-green">
                <CrownIcon className="w-6 h-6" />
              </span>

              <span className="text-xs w-fit h-fit py-1.5 px-2.5 bg-brand-green font-semibold text-white rounded-full">
                {subscription.plan_snapshot.name}
              </span>
            </div>
          )}
        </div>
      </Tile>

      <div className="flex flex-col md:flex-row gap-5 items-start w-full h-full min-h-full">
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

        <div className="flex flex-col gap-5 items-start w-full h-full min-h-full">
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

                    {planName && (
                      <span className="whitespace-nowrap bg-yellow-600 text-white px-2 py-1 rounded-full text-[9px] font-semibold">
                        {planName}
                      </span>
                    )}
                  </div>
                </Tile.TileItem>
              </Link>
            </Tile>
          </div>

          <div className="w-full h-fit flex flex-col gap-4">
            <p className="text-sm text-neutral-400 font-medium">
              App Preferences
            </p>
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
                <p className="text-xs text-neutral-500">
                  Know more about our app
                </p>
              </Tile.TileItem>
              <Tile.TileItem>
                <div className="p-3.5 rounded-lg bg-neutral-900 text-white flex items-center justify-between">
                  <p className="text-sm font-semibold">Contact Support</p>
                  <CaretRightIcon className="h-3 w-3" />
                </div>
              </Tile.TileItem>
            </Tile>
          </div>
        </div>
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

/*
{
    "subRes": {
        "message": "User subscription fetched",
        "data": {
            "id": "2a5e5613-c9e5-44c5-a75c-58af2ed6c79f",
            "user_id": "46d0c09c-4149-47e7-a8fb-e184f90375db",
            "plan_id": "a7bc5fc6-ebb9-424d-99a9-4bac5a495e01",
            "meeting_hours": 0,
            "start_date": "2025-10-13T13:02:32.093755Z",
            "end_date": "2025-10-13T13:02:32.093755Z",
            "created_by": {
                "email": "sre@devontech.io",
                "last_name": "Admin",
                "user_type": "PLATFORM_ADMIN",
                "first_name": "DevonTech"
            },
            "plan_snapshot": {
                "name": "Basic",
                "price_ngn": 4999,
                "meeting_hours": 30
            },
            "feature_snapshot_list": null,
            "coupon_snapshot": null,
            "status": "ACTIVE",
            "created_at": "2025-10-13T13:02:32.093861Z",
            "updated_at": "2025-10-13T13:02:32.093861Z",
            "DeletedAt": null
        }
    },
    "msg": "Data retrieved"
}
 */
