import { UserCircle2Icon } from "lucide-react";
import Image from "next/image";

type ProfileImageProps = {
  imageUrl?: string;
};

export function ProfileImage({ imageUrl }: ProfileImageProps) {
  return (
    <div className="min-w-24 w-24 h-24 bg-linear-to-b from-brand-blue to-brand-green p-0.5 rounded-full overflow-hidden">
      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="profile"
            height={300}
            width={300}
            className="object-center object-cover h-full w-full"
          />
        ) : (
          <UserCircle2Icon className="w-full h-full text-neutral-400" />
        )}
      </div>
    </div>
  );
}
