import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/registry/ui/command";

export const usage = `import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/neoncite/command"

export function Demo() {
  return (
    <Command>
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>Deploy</CommandItem>\n          <CommandItem>Restart</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`;

export const preview = (
  <div className="w-[320px]">
    <Command>
      <CommandInput placeholder="Type a command…" autoFocus={false} />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            Deploy<CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Restart<CommandShortcut>⌘R</CommandShortcut>
          </CommandItem>
          <CommandItem>Drain node</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </div>
);
