import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Tile({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Card
      className={cn("rounded-lg shadow-none border-none", className)}
      {...props}
    >
      {children}
    </Card>
  );
}

function TileItem({
  className,
  children,
  suffixIcon,
  prefixIcon,
  ...props
}: React.ComponentProps<"div"> & {
  suffixIcon?: React.ReactNode;
  prefixIcon?: React.ReactNode;
}) {
  return (
    <CardContent
      className={cn("gap-4 flex items-center", className)}
      {...props}
    >
      {prefixIcon && <div className="h-fit w-fit max-w-8">{prefixIcon}</div>}
      <div className="w-full h-full flex-1">{children}</div>
      {suffixIcon && (
        <div className="h-fit w-fit max-w-8 text-neutral-400">{suffixIcon}</div>
      )}
    </CardContent>
  );
}

Tile.TileItem = TileItem;
