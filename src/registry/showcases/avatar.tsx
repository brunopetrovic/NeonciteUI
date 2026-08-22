import { Avatar, AvatarFallback } from "@/registry/ui/avatar";

export const usage = `import { Avatar, AvatarImage, AvatarFallback } from "@/components/neoncite/avatar"

export function Demo() {
  return (
    <Avatar><AvatarFallback>NX</AvatarFallback></Avatar>
  )
}`;

export const preview = (
  <div className="flex gap-3">
    <Avatar>
      <AvatarFallback>NX</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback className="text-[color:var(--neon-pink)]">02</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback className="text-[#00f0ff]">AI</AvatarFallback>
    </Avatar>
  </div>
);
