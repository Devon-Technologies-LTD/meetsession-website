"use client";

import { ProfileImage } from "@/components/ui/profile-image";
import {
  TUpdateProfile,
  updateProfileSchema,
} from "@/features/dashboard/lib/schemas";
import { TProfileResponse } from "@/features/dashboard/lib/types";
import {
  updateProfileAction,
  uploadProfileImage,
} from "@/features/dashboard/server/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CameraIcon, Loader2Icon, UploadCloudIcon, XIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TFullUser } from "@/lib/types";
import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion as m } from "motion/react";

type EditProfileProps = {
  defaultValues?: TFullUser | null;
};

export function EditProfile({ defaultValues }: EditProfileProps) {
  const initialValues: TUpdateProfile = {
    profile_image: defaultValues?.profile_image,
    email: defaultValues?.email,
    first_name: defaultValues?.first_name,
    last_name: defaultValues?.last_name,
  };

  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <EditProfileImage imageUrl={defaultValues?.profile_image} />

      <EditProfileForm defaultValues={initialValues} />
    </div>
  );
}

type EditProfileFormProps = {
  onSuccessAction?: (response?: TProfileResponse | null) => void;
  onFailedAction?: (error?: Record<string, string> | string[] | string) => void;
  defaultValues?: Partial<TUpdateProfile>;
};

export function EditProfileForm({
  onSuccessAction: onSuccess,
  onFailedAction: onError,
  defaultValues,
}: EditProfileFormProps) {
  const form = useForm<TUpdateProfile>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
  });

  async function onSubmit(values: TUpdateProfile) {
    const formdata = new FormData();
    Object.keys(values).forEach((value) => {
      formdata.append(value, values[value as keyof typeof values] ?? "");
    });

    const response = await updateProfileAction(formdata);

    if (response.success) {
      toast.success("Successfully");
      form.reset();
      onSuccess?.(response?.data);
    } else {
      toast.error(response.message, {
        description: response.errors.toString(),
      });
      onError?.(response.errors);
    }
  }

  return (
    <div className="z-10 flex flex-col justify-center items-center gap-6 w-full h-full text-center">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col gap-5 ",
          "z-10 max-w-2xl w-full",
          "text-start [&_button]:placeholder:text-white font-dm-sans",
        )}
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label className="font-bold" htmlFor={field.name}>
                  First Name
                </Label>
                <FormControl>
                  <Input
                    id={field.name}
                    placeholder="First Name"
                    className="pill py-6 text-sm md:text-base placeholder:text-gray-300 focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label className="font-bold" htmlFor={field.name}>
                  Last Name
                </Label>
                <FormControl>
                  <Input
                    id={field.name}
                    placeholder="Last Name"
                    className="pill py-6 text-sm md:text-base placeholder:text-gray-300 focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <Label className="font-bold" htmlFor={field.name}>
                  Email
                </Label>
                <FormControl>
                  <Input
                    id={field.name}
                    placeholder="Enter your email address"
                    className="pill py-6 text-sm md:text-base placeholder:text-gray-300 focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>

        <Button
          variant="brand-green"
          type="submit"
          size="pill"
          className="text-white font-medium py-6 cursor-pointer relative overflow-hidden"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          {form.formState.isSubmitting && (
            <span className="w-full h-full bg-inherit pointer-events-none cursor-not-allowed absolute top-0 right-0 flex items-center justify-center">
              <Loader2Icon className="animate-spin" />
            </span>
          )}
          Save Changes
        </Button>
      </form>
      <p className="text-neutral-400 text-xs text-center">
        &copy; 2025 MeetSession by Devon Technologies LTD
      </p>
    </div>
  );
}

export function EditProfileImage({ imageUrl }: { imageUrl?: string }) {
  const [filePreview, setFilePreview] = useState<string | undefined>(imageUrl);

  const inputRef = useRef<HTMLInputElement>(null);

  const [state, action, loading] = useActionState(
    uploadProfileImage,
    undefined,
  );

  useEffect(() => {
    if (state !== undefined) {
      if (state?.success) {
        toast.success(state.message);
      }
      if (!state?.success) {
        toast.warning(state?.message, { description: state?.errors });
      }
    }
  }, [state]);

  const setPreviewFile = useCallback(
    (file?: File) => {
      let url: string;
      if (file) {
        url = URL.createObjectURL(file);
        setFilePreview(url);
      }
    },
    [setFilePreview],
  );

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files?.[0];
    setPreviewFile(file);
  }

  return (
    <div className="relative h-max w-max">
      <ProfileImage imageUrl={filePreview} />

      <m.form
        layout
        action={action}
        className={cn(
          "absolute -bottom-4",
          [filePreview ? "-right-10" : "-right-4"],
          "flex items-center gap-2.5",
          "w-fit h-fit",
        )}
      >
        {filePreview ? (
          <>
            <m.div layoutId="confirm">
              <Button
                size="icon"
                variant="secondary"
                className="hover:bg-white hover:opacity-95  bg-white shadow-lg p-6 rounded-full relative overflow-hidden"
                type="submit"
                // disabled={loading}
              >
                {loading && (
                  <span
                    className={cn(
                      "flex items-center justify-center",
                      "h-full w-full bg-inherit",
                      "absolute top-0 left-0 ",
                      "pointer-events-none",
                    )}
                  >
                    <Loader2Icon className="animate-spin !h-5 !w-5" />
                  </span>
                )}
                <UploadCloudIcon className="text-brand-green !h-5 !w-5" />
              </Button>
            </m.div>

            <m.div>
              <Button
                size="icon"
                variant="secondary"
                type="button"
                className="hover:cursor-pointer bg-white shadow-lg p-6 rounded-full"
                disabled={loading}
                onClick={() => {
                  setFilePreview(undefined);
                }}
              >
                <XIcon className="text-rose-400 !h-5 !w-5" />
              </Button>
            </m.div>
          </>
        ) : (
          <m.div layoutId="confirm">
            <Button
              size="icon"
              variant="secondary"
              type="button"
              className="bg-white shadow-lg p-6 rounded-full"
              onClick={() => inputRef.current?.click()}
            >
              <CameraIcon className="text-brand-green !h-5 !w-5" />
            </Button>
          </m.div>
        )}

        <input
          ref={inputRef}
          type="file"
          name="profile_image"
          accept="image/*"
          className="opacity-0"
          hidden
          onChange={handleImageChange}
        />
      </m.form>
    </div>
  );
}
