"use client";
import * as React from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileUploadProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  onFilesChange?: (files: File[]) => void;
}

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label = "Drop files or browse",
      description,
      onFilesChange,
      className,
      multiple,
      accept,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const setRef = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };
    const emit = (list: FileList | null) => onFilesChange?.(list ? Array.from(list) : []);
    return (
      <div
        className={cn(
          "relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-[14px] border border-dashed border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-6 text-center transition-colors hover:border-[color:var(--primary)]/50 hover:bg-[color:var(--primary)]/[.03]",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          emit(event.dataTransfer.files);
        }}
      >
        <input
          ref={setRef}
          type="file"
          multiple={multiple}
          accept={accept}
          disabled={disabled}
          className="sr-only"
          onChange={(event) => emit(event.target.files)}
          {...props}
        />
        <UploadCloud className="h-7 w-7 text-[color:var(--neon-cyan)]" />
        <div className="mt-3 font-mono text-[11px] uppercase tracking-[.15em] text-foreground">
          {label}
        </div>
        {description && <div className="mt-1.5 text-xs text-muted-foreground">{description}</div>}
      </div>
    );
  },
);
FileUpload.displayName = "FileUpload";
