import { getMetrics } from "@/features/base/server";

export async function GET() {
  const res = await getMetrics();
  if (!res.success) {
    return Response.json(
      { message: res.errors, error: res.errors },
      { status: res.status },
    );
  } else {
    return Response.json(
      { message: res.message, data: res.data },
      { status: res.status },
    );
  }
}
