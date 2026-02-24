import { createApiClient } from "@/lib/api-client";
import { BASE_URL } from "@/lib/constants";
import { TFolder, TPagedResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

type MeetingProps = {
  page: number;
};

const apiClient = createApiClient({
  baseURL: BASE_URL,
});

export default async function Folders({ page }: MeetingProps) {
  const size = 20;

  const res = await apiClient.authenticated<TPagedResponse<TFolder>>(
    `/folders?page=${page}&size=${size}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-sm text-red-600">
          Failed to load folders: {res.error}
        </p>
      </div>
    );
  }

  const folders = res.data.data;
  const totalPages = res.data.total_pages;
  const currentPage = res.data.page;

  return (
    <div className="w-full h-full flex flex-col gap-6">
      {folders.length === 0 ? (
        <div className="flex items-center justify-center h-40">
          <p className="text-sm text-muted-foreground">
            No folders found yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5">
          {folders.map((folder) => (
            <Link
              key={folder.id}
              href={`/dashboard/folders/${folder.id}`}
              className="flex flex-col items-center gap-2 rounded-md px-3 py-2 text-center cursor-pointer"
            >
              <div className="relative h-24 w-24">
                <Image
                  src="/svg/folder.svg"
                  alt="Folder icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold truncate max-w-[8rem]">
                  {folder.name}
                </span>
                <span className="text-xs text-neutral-600">
                  {folder.total_meetings} meeting
                  {folder.total_meetings === 1 ? "" : "s"}
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
            <Button
              asChild
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
            >
              <Link
                href={`/dashboard/folders?page=${currentPage - 1}`}
                scroll={false}
              >
                Previous
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
            >
              <Link
                href={`/dashboard/folders?page=${currentPage + 1}`}
                scroll={false}
              >
                Next
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
