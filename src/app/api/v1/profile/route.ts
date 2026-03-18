import { retrieveProfileAction } from "@/features/dashboard/server/actions";

export async function GET() {
  const res = await retrieveProfileAction();

  if (res.success) {
    return Response.json(res.data.data, { status: res.status });
  }

  if (res.status === 400) {
    return Response.json(res.errors, { status: res.status });
  }

  return Response.json(res.errors, { status: 500 });
}
