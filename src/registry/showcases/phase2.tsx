import { Bold, Database, FileText, Folder, Italic, Settings, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/ui/alert-dialog";
import { AspectRatio } from "@/registry/ui/aspect-ratio";
import { Button } from "@/registry/ui/button";
import { ButtonGroup } from "@/registry/ui/button-group";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/ui/carousel";
import { CodeBlock, InlineCode } from "@/registry/ui/code";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/ui/collapsible";
import { Combobox } from "@/registry/ui/combobox";
import { CommandBar } from "@/registry/ui/command-bar";
import { ConnectionStatus } from "@/registry/ui/connection-status";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/registry/ui/context-menu";
import { CopyButton } from "@/registry/ui/copy-button";
import { DataList, DataListItem, DataListLabel, DataListValue } from "@/registry/ui/data-list";
import { DatePicker } from "@/registry/ui/date-picker";
import { DeploymentStatus } from "@/registry/ui/deployment-status";
import { DiagnosticPanel } from "@/registry/ui/diagnostic-panel";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/ui/drawer";
import { EmptyState } from "@/registry/ui/empty-state";
import { FileUpload } from "@/registry/ui/file-upload";
import { Gauge } from "@/registry/ui/gauge";
import { HudPanel } from "@/registry/ui/hud-panel";
import { IconButton } from "@/registry/ui/icon-button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/registry/ui/input-group";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/registry/ui/input-otp";
import { Kbd } from "@/registry/ui/kbd";
import { LatencyIndicator } from "@/registry/ui/latency-indicator";
import { LoadingOverlay } from "@/registry/ui/loading-overlay";
import { LogViewer } from "@/registry/ui/log-viewer";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/registry/ui/menubar";
import { MetricGrid } from "@/registry/ui/metric-grid";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/ui/navigation-menu";
import { NumberField } from "@/registry/ui/number-field";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/ui/pagination";
import { PasswordInput } from "@/registry/ui/password-input";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/ui/resizable";
import { ResourceMeter } from "@/registry/ui/resource-meter";
import { ScrollArea } from "@/registry/ui/scroll-area";
import { SearchInput } from "@/registry/ui/search-input";
import { ServerCard } from "@/registry/ui/server-card";
import { SparklineMetric } from "@/registry/ui/sparkline-metric";
import { Spinner } from "@/registry/ui/spinner";
import { StatusIndicator } from "@/registry/ui/status-indicator";
import { StatusLed } from "@/registry/ui/status-led";
import { Stepper } from "@/registry/ui/stepper";
import { SystemHealth } from "@/registry/ui/system-health";
import { TelemetryHeader, TelemetryPanel, TelemetryRow } from "@/registry/ui/telemetry-panel";
import { Terminal, TerminalLine, TerminalOutput } from "@/registry/ui/terminal";
import { TimePicker } from "@/registry/ui/time-picker";
import { Timeline } from "@/registry/ui/timeline";
import { ToggleGroup, ToggleGroupItem } from "@/registry/ui/toggle-group";
import { TreeView } from "@/registry/ui/tree-view";
import { ActivityStream } from "@/registry/ui/activity-stream";

export interface Phase2Showcase {
  preview: React.ReactNode;
  usage: string;
}

const usage = (exports: string, slug: string, body: string) =>
  `import { ${exports} } from "@/components/neoncite/${slug}"\n\nexport function Demo() {\n  return (${body});\n}`;

export const PHASE2_SHOWCASES: Record<string, Phase2Showcase> = {
  "alert-dialog": {
    preview: (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete deployment</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete deployment?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
    usage: usage(
      "AlertDialog, AlertDialogTrigger, AlertDialogContent",
      "alert-dialog",
      "<AlertDialog>{/* … */}</AlertDialog>",
    ),
  },
  "aspect-ratio": {
    preview: (
      <div className="w-64 overflow-hidden rounded-[12px] border border-[color:var(--hairline)]">
        <AspectRatio ratio={16 / 9}>
          <div className="flex h-full items-center justify-center bg-grid bg-[color:var(--surface-2)] font-mono text-[11px] text-muted-foreground">
            16:9 telemetry feed
          </div>
        </AspectRatio>
      </div>
    ),
    usage: usage("AspectRatio", "aspect-ratio", "<AspectRatio ratio={16 / 9}>…</AspectRatio>"),
  },
  collapsible: {
    preview: (
      <Collapsible className="w-72">
        <CollapsibleTrigger asChild>
          <Button variant="outline">Runtime details</Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 rounded-[10px] border border-[color:var(--hairline)] p-3 text-xs text-muted-foreground">
          Region fra-1 · Node edge-07
        </CollapsibleContent>
      </Collapsible>
    ),
    usage: usage(
      "Collapsible, CollapsibleTrigger, CollapsibleContent",
      "collapsible",
      "<Collapsible>{/* … */}</Collapsible>",
    ),
  },
  "scroll-area": {
    preview: (
      <ScrollArea className="h-36 w-72 rounded-[12px] border border-[color:var(--hairline)] p-3">
        <div className="space-y-2 font-mono text-[11px]">
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="border-b border-white/[.04] pb-2 text-muted-foreground">
              event/{String(index + 1).padStart(2, "0")} · ok
            </div>
          ))}
        </div>
      </ScrollArea>
    ),
    usage: usage("ScrollArea", "scroll-area", '<ScrollArea className="h-48">…</ScrollArea>'),
  },
  "toggle-group": {
    preview: (
      <ToggleGroup type="multiple" defaultValue={["bold"]}>
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    ),
    usage: usage(
      "ToggleGroup, ToggleGroupItem",
      "toggle-group",
      '<ToggleGroup type="multiple">…</ToggleGroup>',
    ),
  },
  "context-menu": {
    preview: (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-28 w-64 items-center justify-center rounded-[12px] border border-dashed border-[color:var(--hairline)] bg-[color:var(--surface-1)] font-mono text-[11px] text-muted-foreground">
          Right-click this surface
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>
            <Settings className="h-3.5 w-3.5" /> Settings
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem className="text-[color:var(--neon-red)]">
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
    usage: usage(
      "ContextMenu, ContextMenuTrigger, ContextMenuContent",
      "context-menu",
      "<ContextMenu>{/* … */}</ContextMenu>",
    ),
  },
  menubar: {
    preview: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New session</MenubarItem>
            <MenubarItem>Open logs</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Telemetry</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
    usage: usage("Menubar, MenubarMenu, MenubarTrigger", "menubar", "<Menubar>{/* … */}</Menubar>"),
  },
  "navigation-menu": {
    preview: (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Overview
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Systems</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-64 p-4 text-sm text-muted-foreground">
                Clusters · Deployments · Logs
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
    usage: usage(
      "NavigationMenu, NavigationMenuList, NavigationMenuItem",
      "navigation-menu",
      "<NavigationMenu>{/* … */}</NavigationMenu>",
    ),
  },
  resizable: {
    preview: (
      <div className="h-36 w-[420px] max-w-full overflow-hidden rounded-[12px] border border-[color:var(--hairline)]">
        <ResizablePanelGroup orientation="horizontal">
          <ResizablePanel defaultSize="35%">
            <div className="flex h-full items-center justify-center bg-[color:var(--surface-1)] text-xs text-muted-foreground">
              Navigator
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize="65%">
            <div className="flex h-full items-center justify-center bg-[color:var(--surface-2)] text-xs text-muted-foreground">
              Workspace
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    ),
    usage: usage(
      "ResizablePanelGroup, ResizablePanel, ResizableHandle",
      "resizable",
      '<ResizablePanelGroup orientation="horizontal">…</ResizablePanelGroup>',
    ),
  },
  "input-otp": {
    preview: (
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          {[0, 1, 2].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          {[3, 4, 5].map((index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    ),
    usage: usage(
      "InputOTP, InputOTPGroup, InputOTPSlot",
      "input-otp",
      "<InputOTP maxLength={6}>…</InputOTP>",
    ),
  },
  drawer: {
    preview: (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Deployment controls</DrawerTitle>
            <DrawerDescription>Review runtime actions before execution.</DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    ),
    usage: usage("Drawer, DrawerTrigger, DrawerContent", "drawer", "<Drawer>{/* … */}</Drawer>"),
  },
  carousel: {
    preview: (
      <Carousel className="w-64">
        <CarouselContent>
          {["CPU", "Memory", "Storage"].map((label) => (
            <CarouselItem key={label}>
              <div className="rounded-[12px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-8 text-center font-mono text-sm">
                {label}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    ),
    usage: usage(
      "Carousel, CarouselContent, CarouselItem",
      "carousel",
      "<Carousel>{/* slides */}</Carousel>",
    ),
  },
  pagination: {
    preview: (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
    usage: usage(
      "Pagination, PaginationContent, PaginationLink",
      "pagination",
      "<Pagination>{/* … */}</Pagination>",
    ),
  },
  combobox: {
    preview: (
      <Combobox
        options={[
          { value: "fra", label: "Frankfurt" },
          { value: "iad", label: "Virginia" },
          { value: "sin", label: "Singapore" },
        ]}
        placeholder="Select region…"
      />
    ),
    usage: usage("Combobox", "combobox", "<Combobox options={options} />"),
  },
  "date-picker": {
    preview: <DatePicker />,
    usage: usage("DatePicker", "date-picker", "<DatePicker />"),
  },
  "empty-state": {
    preview: (
      <EmptyState
        className="w-[360px] max-w-full"
        icon={<Database className="h-5 w-5" />}
        title="No telemetry yet"
        description="Connect a runtime to begin streaming metrics."
        action={<Button size="sm">Connect runtime</Button>}
      />
    ),
    usage: usage("EmptyState", "empty-state", '<EmptyState title="No data" />'),
  },
  spinner: {
    preview: <Spinner className="h-6 w-6" />,
    usage: usage("Spinner", "spinner", "<Spinner />"),
  },
  "loading-overlay": {
    preview: (
      <div className="relative h-36 w-72 overflow-hidden rounded-[12px] border border-[color:var(--hairline)]">
        <LoadingOverlay label="Deploying" description="Syncing edge nodes" />
      </div>
    ),
    usage: usage("LoadingOverlay", "loading-overlay", '<LoadingOverlay label="Loading" />'),
  },
  kbd: {
    preview: (
      <div className="flex items-center gap-1">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </div>
    ),
    usage: usage("Kbd", "kbd", "<Kbd>⌘</Kbd>"),
  },
  code: {
    preview: (
      <div className="w-80 max-w-full space-y-3 text-sm">
        <p>
          Run <InlineCode>neoncite add button</InlineCode>
        </p>
        <CodeBlock>{`const ready = true\nship(ready)`}</CodeBlock>
      </div>
    ),
    usage: usage("InlineCode, CodeBlock", "code", "<InlineCode>npm run dev</InlineCode>"),
  },
  "copy-button": {
    preview: <CopyButton value="npx neoncite add button" />,
    usage: usage("CopyButton", "copy-button", '<CopyButton value="copy me" />'),
  },
  "icon-button": {
    preview: (
      <IconButton label="Settings">
        <Settings />
      </IconButton>
    ),
    usage: usage(
      "IconButton",
      "icon-button",
      '<IconButton label="Settings"><Settings /></IconButton>',
    ),
  },
  "status-indicator": {
    preview: (
      <div className="flex gap-4">
        <StatusIndicator status="online">Healthy</StatusIndicator>
        <StatusIndicator status="warning" pulse>
          Degraded
        </StatusIndicator>
      </div>
    ),
    usage: usage(
      "StatusIndicator",
      "status-indicator",
      '<StatusIndicator status="online">Healthy</StatusIndicator>',
    ),
  },
  "input-group": {
    preview: (
      <InputGroup className="w-72">
        <InputGroupAddon>https://</InputGroupAddon>
        <InputGroupInput placeholder="api.example.com" />
      </InputGroup>
    ),
    usage: usage(
      "InputGroup, InputGroupAddon, InputGroupInput",
      "input-group",
      "<InputGroup>{/* … */}</InputGroup>",
    ),
  },
  "button-group": {
    preview: (
      <ButtonGroup>
        <Button variant="outline">Logs</Button>
        <Button variant="outline">Metrics</Button>
        <Button variant="outline">Events</Button>
      </ButtonGroup>
    ),
    usage: usage("ButtonGroup", "button-group", "<ButtonGroup>{/* buttons */}</ButtonGroup>"),
  },
  "search-input": {
    preview: <SearchInput className="w-72" placeholder="Search services…" />,
    usage: usage("SearchInput", "search-input", '<SearchInput placeholder="Search…" />'),
  },
  "password-input": {
    preview: <PasswordInput className="w-72" placeholder="••••••••••" />,
    usage: usage("PasswordInput", "password-input", "<PasswordInput />"),
  },
  "number-field": {
    preview: <NumberField defaultValue={3} min={1} max={10} />,
    usage: usage("NumberField", "number-field", "<NumberField defaultValue={3} />"),
  },
  "time-picker": {
    preview: <TimePicker defaultValue="14:30" />,
    usage: usage("TimePicker", "time-picker", "<TimePicker />"),
  },
  "file-upload": {
    preview: <FileUpload className="w-80" description="JSON, CSV, or log bundles" />,
    usage: usage("FileUpload", "file-upload", "<FileUpload onFilesChange={setFiles} />"),
  },
  stepper: {
    preview: (
      <div className="w-[520px] max-w-full">
        <Stepper
          current={1}
          items={[{ title: "Configure" }, { title: "Validate" }, { title: "Deploy" }]}
        />
      </div>
    ),
    usage: usage("Stepper", "stepper", "<Stepper current={1} items={steps} />"),
  },
  timeline: {
    preview: (
      <div className="w-80">
        <Timeline
          items={[
            { title: "Build started", time: "14:22" },
            { title: "Tests passed", time: "14:23" },
            { title: "Deployed", time: "14:24" },
          ]}
        />
      </div>
    ),
    usage: usage("Timeline", "timeline", "<Timeline items={events} />"),
  },
  "data-list": {
    preview: (
      <DataList className="w-72">
        <DataListItem>
          <DataListLabel>Region</DataListLabel>
          <DataListValue>fra-1</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListLabel>Runtime</DataListLabel>
          <DataListValue>node-22</DataListValue>
        </DataListItem>
      </DataList>
    ),
    usage: usage("DataList, DataListItem", "data-list", "<DataList>{/* metadata */}</DataList>"),
  },
  "tree-view": {
    preview: (
      <div className="w-72">
        <TreeView
          defaultExpanded={["src"]}
          nodes={[
            {
              id: "src",
              label: "src",
              icon: <Folder className="h-3.5 w-3.5" />,
              children: [
                { id: "app", label: "App.tsx", icon: <FileText className="h-3.5 w-3.5" /> },
                { id: "ui", label: "components" },
              ],
            },
          ]}
        />
      </div>
    ),
    usage: usage("TreeView", "tree-view", "<TreeView nodes={nodes} />"),
  },
  terminal: {
    preview: (
      <Terminal className="w-[420px] max-w-full" status="connected">
        <TerminalLine>neoncite add terminal</TerminalLine>
        <TerminalOutput>{`✓ resolved dependencies\n✓ component installed`}</TerminalOutput>
      </Terminal>
    ),
    usage: usage(
      "Terminal, TerminalLine, TerminalOutput",
      "terminal",
      "<Terminal><TerminalLine>npm run dev</TerminalLine></Terminal>",
    ),
  },
  "log-viewer": {
    preview: (
      <LogViewer
        className="h-40 w-[520px] max-w-full"
        entries={[
          { timestamp: "14:22:01", level: "info", message: "worker connected", source: "edge" },
          {
            timestamp: "14:22:03",
            level: "success",
            message: "health check passed",
            source: "api",
          },
          {
            timestamp: "14:22:08",
            level: "warn",
            message: "latency above target",
            source: "fra-1",
          },
        ]}
      />
    ),
    usage: usage("LogViewer", "log-viewer", "<LogViewer entries={entries} />"),
  },
  "status-led": {
    preview: (
      <div className="flex gap-5">
        <StatusLed status="online" pulse label="online" />
        <StatusLed status="warning" label="warning" />
        <StatusLed status="error" label="error" />
      </div>
    ),
    usage: usage("StatusLed", "status-led", '<StatusLed status="online" />'),
  },
  "connection-status": {
    preview: <ConnectionStatus state="connected" endpoint="fra-1" latency={42} />,
    usage: usage(
      "ConnectionStatus",
      "connection-status",
      '<ConnectionStatus state="connected" latency={42} />',
    ),
  },
  "telemetry-panel": {
    preview: (
      <TelemetryPanel className="w-80">
        <TelemetryHeader>
          <span>Runtime</span>
          <span>live</span>
        </TelemetryHeader>
        <TelemetryRow label="CPU" value="34%" tone="green" />
        <TelemetryRow label="Memory" value="6.2 GB" tone="cyan" />
      </TelemetryPanel>
    ),
    usage: usage(
      "TelemetryPanel, TelemetryRow",
      "telemetry-panel",
      "<TelemetryPanel>{/* rows */}</TelemetryPanel>",
    ),
  },
  gauge: {
    preview: <Gauge value={72} label="CPU" unit="%" />,
    usage: usage("Gauge", "gauge", '<Gauge value={72} label="CPU" />'),
  },
  "sparkline-metric": {
    preview: (
      <SparklineMetric
        className="w-72"
        label="Requests/s"
        value="14.2k"
        delta="+8.4%"
        data={[8, 12, 9, 15, 18, 16, 24, 21]}
      />
    ),
    usage: usage(
      "SparklineMetric",
      "sparkline-metric",
      '<SparklineMetric label="RPS" value="14k" data={data} />',
    ),
  },
  "resource-meter": {
    preview: (
      <div className="w-72">
        <ResourceMeter label="Memory" value={68} detail="10.8 / 16 GB" />
      </div>
    ),
    usage: usage("ResourceMeter", "resource-meter", '<ResourceMeter label="Memory" value={68} />'),
  },
  "latency-indicator": {
    preview: <LatencyIndicator value={84} />,
    usage: usage("LatencyIndicator", "latency-indicator", "<LatencyIndicator value={84} />"),
  },
  "system-health": {
    preview: (
      <SystemHealth
        className="w-80"
        checks={[
          { label: "API", status: "online", value: "42ms" },
          { label: "Queue", status: "warning", value: "1.2s" },
          { label: "Database", status: "online", value: "18ms" },
        ]}
      />
    ),
    usage: usage("SystemHealth", "system-health", "<SystemHealth checks={checks} />"),
  },
  "deployment-status": {
    preview: (
      <DeploymentStatus
        className="w-[420px] max-w-full"
        name="api-edge"
        environment="production"
        status="ready"
        commit="9f31a2c"
        duration="52s"
      />
    ),
    usage: usage(
      "DeploymentStatus",
      "deployment-status",
      '<DeploymentStatus name="api" status="ready" />',
    ),
  },
  "activity-stream": {
    preview: (
      <div className="w-80">
        <ActivityStream
          items={[
            {
              title: "Deployment ready",
              detail: "api-edge · production",
              time: "now",
              status: "online",
            },
            { title: "Config changed", detail: "rate limit updated", time: "4m", status: "info" },
          ]}
        />
      </div>
    ),
    usage: usage("ActivityStream", "activity-stream", "<ActivityStream items={items} />"),
  },
  "server-card": {
    preview: (
      <ServerCard
        className="w-80"
        name="edge-07"
        region="fra-1"
        cpu={34}
        memory={61}
        storage={48}
      />
    ),
    usage: usage("ServerCard", "server-card", '<ServerCard name="edge-07" cpu={34} />'),
  },
  "hud-panel": {
    preview: (
      <HudPanel className="w-80" label="NODE/07" corner="LIVE">
        <div className="grid grid-cols-2 gap-4 font-mono">
          <div>
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground">
              Throughput
            </div>
            <div className="mt-1 text-xl neon-cyan">8.4 GB/s</div>
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Health</div>
            <div className="mt-1 text-xl neon-green">99.99%</div>
          </div>
        </div>
      </HudPanel>
    ),
    usage: usage("HudPanel", "hud-panel", '<HudPanel label="NODE/07">…</HudPanel>'),
  },
  "diagnostic-panel": {
    preview: (
      <DiagnosticPanel
        className="w-[420px] max-w-full"
        items={[
          { severity: "pass", title: "Registry reachable" },
          { severity: "warning", title: "Latency elevated", detail: "p95 is 184ms" },
          { severity: "info", title: "New runtime available" },
        ]}
      />
    ),
    usage: usage("DiagnosticPanel", "diagnostic-panel", "<DiagnosticPanel items={items} />"),
  },
  "command-bar": {
    preview: <CommandBar className="w-80">Search deployments, logs, and commands…</CommandBar>,
    usage: usage("CommandBar", "command-bar", "<CommandBar>Search commands…</CommandBar>"),
  },
  "metric-grid": {
    preview: (
      <MetricGrid className="w-[520px] max-w-full grid-cols-2">
        <SparklineMetric label="RPS" value="14k" data={[4, 6, 5, 8, 10]} />
        <SparklineMetric
          label="Errors"
          value="0.4%"
          data={[2, 1, 3, 1, 1]}
          accent="var(--neon-red)"
        />
      </MetricGrid>
    ),
    usage: usage("MetricGrid", "metric-grid", "<MetricGrid>{/* metric cards */}</MetricGrid>"),
  },
};
