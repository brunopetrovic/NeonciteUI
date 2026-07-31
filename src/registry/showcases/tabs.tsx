import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs";

export const usage = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/neoncite/tabs"

export function Demo() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="logs">Logs</TabsTrigger>
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">All systems nominal.</TabsContent>
      <TabsContent value="logs">Last 50 events…</TabsContent>
      <TabsContent value="metrics">CPU 14% · MEM 312Mi</TabsContent>
    </Tabs>
  )
}`;

export const preview = (
  <Tabs defaultValue="overview" className="w-[340px]">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="logs">Logs</TabsTrigger>
      <TabsTrigger value="metrics">Metrics</TabsTrigger>
    </TabsList>
    <TabsContent value="overview" className="text-[13px] text-muted-foreground">
      All systems nominal.
    </TabsContent>
    <TabsContent value="logs" className="text-[13px] text-muted-foreground">
      Last 50 events…
    </TabsContent>
    <TabsContent value="metrics" className="text-[13px] text-muted-foreground">
      CPU 14% · MEM 312Mi
    </TabsContent>
  </Tabs>
);
