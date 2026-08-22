import { Skeleton } from "@/registry/ui/skeleton";

export const usage = `import { Skeleton } from "@/components/neoncite/skeleton"

export function Demo() {
  return (
    <div className="space-y-2 w-[280px]">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}`;

export const preview = (
  <div className="space-y-2 w-[280px]">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-12 w-full" />
  </div>
);
