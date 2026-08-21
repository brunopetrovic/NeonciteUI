import { Button } from "@/registry/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/ui/dialog";

export const usage = `import { Button } from "@/components/neoncite/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/neoncite/dialog"

export function Demo() {
  return (
    <Dialog>
      <DialogTrigger asChild><Button variant="neon">Open dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Initiate sequence?</DialogTitle>
          <DialogDescription>This will reboot the active cluster.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}`;

export const preview = (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="neon">Open dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Initiate sequence?</DialogTitle>
        <DialogDescription>This will reboot the active cluster.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
