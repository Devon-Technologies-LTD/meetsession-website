"use client";

import { TUpdateProfile, updateProfileSchema } from "@/features/dashboard/lib/schemas";
import { updatePassword, updateProfileAction } from "@/features/dashboard/server/actions";
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
import { Loader2Icon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";


const INITIAL_VALUES: TUpdateProfile = {
    old_password: '',
    new_password: '',
    confirm_password: '',
};

export function ChangePassword() {
    return (
        <div className="w-full h-full flex flex-col items-center gap-5 mb-10">
            <EditProfileForm />
        </div>
    );
}

export function EditProfileForm() {
    const form = useForm<TUpdateProfile>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: INITIAL_VALUES,
    });
      const router = useRouter();

    async function onSubmit(values: TUpdateProfile) {
        const formdata = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formdata.append(key, value ?? "");
        });

        const response = await updatePassword(formdata);
        if (response.success) {
            toast.success("Password updated successfully");
            form.reset();
            router.back();
        } else {
            toast.error(response.message, {
                description: Array.isArray(response.errors) 
                    ? response.errors.join(", ") 
                    : response.errors.toString(),
            });
        }
    }

    const { isSubmitting, isDirty } = form.formState;

    return (
        <div className="z-10 flex flex-col justify-center items-center gap-6 w-full h-full text-center">
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    "flex flex-col gap-5 z-10 max-w-2xl w-full",
                    "text-start font-dm-sans",
                )}
            >
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="old_password"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Label className="font-bold" htmlFor={field.name}>
                                    Current Password
                                </Label>
                                <FormControl>
                                    <Input
                                        type="password"
                                        id={field.name}
                                        placeholder="Enter your current password"
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
                        name="new_password"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Label className="font-bold" htmlFor={field.name}>
                                    New Password
                                </Label>
                                <FormControl>
                                    <Input
                                        type="password"
                                        id={field.name}
                                        placeholder="Enter your new password"
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
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Label className="font-bold" htmlFor={field.name}>
                                    Confirm Password
                                </Label>
                                <FormControl>
                                    <Input
                                        type="password"
                                        id={field.name}
                                        placeholder="Confirm your new password"
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
                    className="text-white font-medium py-6 relative"
                    disabled={isSubmitting || !isDirty}
                >
                    {isSubmitting && (
                        <Loader2Icon className="absolute animate-spin" />
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

export default EditProfileForm;