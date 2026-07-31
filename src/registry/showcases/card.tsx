import * as React from "react";
import { Button } from "@/registry/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/ui/card";

export const usage = `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/neoncite/card"
import { Button } from "@/components/neoncite/button"

export function Demo() {
  return (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>Cluster Status</CardTitle>
        <CardDescription>3 nodes online · uptime 99.98%</CardDescription>
      </CardHeader>
      <CardContent className="text-[13px] text-muted-foreground">All systems nominal.</CardContent>
      <CardFooter className="justify-end"><Button variant="primary" size="sm">Inspect</Button></CardFooter>
    </Card>
  )
}`;

export const preview = (
  <Card className="w-[320px]">
    <CardHeader>
      <CardTitle>Cluster Status</CardTitle>
      <CardDescription>3 nodes online · uptime 99.98%</CardDescription>
    </CardHeader>
    <CardContent className="text-[13px] text-muted-foreground">All systems nominal.</CardContent>
    <CardFooter className="justify-end">
      <Button variant="primary" size="sm">
        Inspect
      </Button>
    </CardFooter>
  </Card>
);
