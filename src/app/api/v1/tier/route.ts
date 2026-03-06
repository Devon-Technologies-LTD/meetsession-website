import { retrieveTierAction } from "@/features/dashboard/server/actions";

export async function GET() {
    const res = await retrieveTierAction();
    if (res.success) {
        return Response.json(res.data.data, { status: res.status });
    } else if (res.status === 400) {
        console.log("sub err: ", res.errors);
        return Response.json(res.errors, { status: res.status });
    } else {
        console.log("sub server err: ", res.errors);
        return Response.json(res.errors, { status: 500 });
    }
}
