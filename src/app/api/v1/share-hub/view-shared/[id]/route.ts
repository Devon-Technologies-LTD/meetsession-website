import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return Response.json(
        { message: "Share ID is required", status: false },
        { status: 400 }
      );
    }

    // Construct the API URL
    const apiUrl = `${process.env.BASE_URL?.replace('/api/v1', '')}/share-hub/view-shared/${id}`;

    // Forward the request to the actual API
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { message: data.message || "Failed to fetch meeting", status: false },
        { status: response.status }
      );
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching shared meeting:", error);
    return Response.json(
      {
        message: error instanceof Error ? error.message : "Internal server error",
        status: false
      },
      { status: 500 }
    );
  }
}
