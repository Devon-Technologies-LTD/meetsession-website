"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema, TLogin } from "@/lib/schemas";
import { loginAction } from "@/server/actions";
import { TLoginResponse } from "@/lib/types";

export function useSigninForm({
  defaultEmail,
  onSuccess,
}: {
  defaultEmail?: string;
  onSuccess?: (response?: TLoginResponse | null) => void;
}) {
  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: defaultEmail ?? "",
      password: "",
    },
  });

  async function onSubmit(values: TLogin) {
    const formdata = new FormData();
    Object.keys(values).forEach((value) => {
      formdata.append(value, values[value as keyof typeof values] ?? "");
    });

    const response = await loginAction(formdata);

    if (response.success) {
      toast.success("Successfully");
      form.reset();
      onSuccess?.(response?.data);
    } else {
      toast.error(
        typeof response.errors === "string"
          ? response.errors
          : response.message,
      );
    }
  }

  return { form, onSubmit };
}
