import { BackButton } from "@/components/back-button";
import { createApiClient } from "@/lib/api-client";
import { BASE_URL } from "@/lib/constants";
import { TPagedResponse, TMeetSession } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const apiClient = createApiClient({
  baseURL: BASE_URL,
});

async function getFolderMeetings(folderId: string, page: number) {
  const size = 20;

  const res = await apiClient.authenticated<TPagedResponse<TMeetSession>>(
    `/${folderId}/meetings?page=${page}&size=${size}`,
    {
      method: "GET",
    },
  );

  return res;
}

function formatDateTime(dateString: string) {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "";

  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ folderId: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { folderId } = await params;
  const query = await searchParams;
  const page = query.page ? Number(query.page) || 1 : 1;

  const res = await getFolderMeetings(folderId, page);

  if (!res.ok) {
    return (
      <section className="h-full w-full flex flex-col gap-10 pt-32 pb-7 px-7 md:px-10">
        <BackButton
          href="/dashboard/folders"
          className="h-12 w-fit self-end fixed top-10"
        />

        <div className="text-brand-blue-dark font-dm-sans w-full h-fit">
          <p className="font-black text-3xl tracking-tight">Meetings</p>
        </div>

        <p className="text-sm text-red-600">
          Failed to load meetings: {res.error}
        </p>
      </section>
    );
  }

  const meetings = res.data.data;
  const totalPages = res.data.total_pages;
  const currentPage = res.data.page;
  const folderName = meetings[0]?.folder?.name ?? "Folder";

  return (
    <section className="h-full w-full flex flex-col gap-10 pt-32 pb-7 px-7 md:px-10">
      <BackButton
        href="/dashboard/folders"
        className="h-12 w-fit self-end fixed top-10"
      />

      <div className="text-brand-blue-dark font-dm-sans w-full h-fit">
        <p className="font-black text-3xl tracking-tight">
          {folderName} Meetings
        </p>
        <p className="text-sm text-muted-foreground">
          Select a meeting to view or play in the app.
        </p>
      </div>

      {meetings.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-sm text-muted-foreground">
            No meetings found in this folder yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5">
          {meetings.map((meeting) => (
            <Link
              key={meeting.id}
              href={`/dashboard/folders/${folderId}/${meeting.id}`}
              className="flex flex-col items-center gap-2 rounded-md px-3 py-2 text-center border border-neutral-200 cursor-pointer"
            >
              <div className="relative h-12 w-12">
                <Image
                  src="/svg/audio.svg"
                  alt="Audio meeting"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold truncate max-w-[8rem]">
                  {meeting.title}
                </span>
                <span className="text-xs text-neutral-600 truncate max-w-[8rem]">
                  {meeting.attendees}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-neutral-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Link
              href={`/dashboard/folders/${folderId}?page=${currentPage - 1}`}
              className={`text-xs px-3 py-1 border rounded-md ${
                currentPage <= 1
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-neutral-100"
              }`}
              aria-disabled={currentPage <= 1}
            >
              Previous
            </Link>
            <Link
              href={`/dashboard/folders/${folderId}?page=${currentPage + 1}`}
              className={`text-xs px-3 py-1 border rounded-md ${
                currentPage >= totalPages
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-neutral-100"
              }`}
              aria-disabled={currentPage >= totalPages}
            >
              Next
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
