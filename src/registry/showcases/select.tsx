import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/ui/select";

export const usage = `import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/neoncite/select"

export function Demo() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]"><SelectValue placeholder="Region" /></SelectTrigger>\n      <SelectContent>
        <SelectItem value="us-east-1">us-east-1</SelectItem>
        <SelectItem value="eu-west-1">eu-west-1</SelectItem>
      </SelectContent>
    </Select>
  )
}`;

export const preview = (
  <Select>
    <SelectTrigger className="w-[220px]">
      <SelectValue placeholder="Select region" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="us-east-1">us-east-1</SelectItem>
      <SelectItem value="eu-west-1">eu-west-1</SelectItem>
      <SelectItem value="ap-south-1">ap-south-1</SelectItem>
    </SelectContent>
  </Select>
);
