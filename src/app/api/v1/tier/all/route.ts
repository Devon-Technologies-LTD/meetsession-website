import { retrieveAllTiersAction } from "@/features/dashboard/server/actions";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams
  const withFeature = params.get("with_feature")

  const res = await retrieveAllTiersAction({ with_feature: !!withFeature });
  if (res.success) {
    return Response.json(res.data.data, { status: res.status });
  } else if (res.status === 400) {
    console.log("all-tiers err: ", res.errors);
    return Response.json(res.errors, { status: res.status });
  } else {
    console.log("all-tiers server err: ", res.errors);
    return Response.json(res.errors, { status: 500 });
  }
}
