import * as React from "react";
import { Label } from "@/registry/ui/label";
import { Input } from "@/registry/ui/input";
import { Button } from "@/registry/ui/button";

export const usage = `import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/neoncite/form"
import { Input } from "@/components/neoncite/input"
import { Button } from "@/components/neoncite/button"

const schema = z.object({ hostname: z.string().min(2, "Too short") })

export function Demo() {
  const form = useForm({ resolver: zodResolver(schema) })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(console.log)}>
        <FormField control={form.control} name="hostname" render={({ field }) => (
          <FormItem>
            <FormLabel>Hostname</FormLabel>
            <FormControl><Input placeholder="cluster-01" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit" variant="primary" className="mt-3">Submit</Button>
      </form>
    </Form>
  )
}`;

export const preview = (
  <div className="w-[300px] space-y-3">
    <div className="space-y-1.5">
      <Label htmlFor="form-demo">Hostname</Label>
      <Input id="form-demo" placeholder="cluster-01.local" />
    </div>
    <div className="space-y-1.5">
      <Label htmlFor="form-demo-2">Port</Label>
      <Input id="form-demo-2" placeholder="8080" type="number" />
    </div>
    <p className="text-[12px] font-medium text-[#ff003c]">Hostname is required.</p>
    <Button variant="primary" size="sm">
      Submit
    </Button>
  </div>
);
