import { apiClient } from "@/lib/server-api";
import { TSubscriptionPlan } from "@/lib/types";

type TResponse = {
  message: string;
  data: TSubscriptionPlan[];
};

export async function GET() {
  const res = await apiClient.unauthenticated<TResponse>(
    "/all-tiers?with_feature=true",
    {
      method: "GET",
    },
  );

  if (res.ok) {
    return Response.json(res.data, { status: res.status });
  }

  return Response.json(
    {
      message: "Failed to retrieve public tiers",
      error: res.error,
    },
    { status: res.status ?? 500 },
  );
}
