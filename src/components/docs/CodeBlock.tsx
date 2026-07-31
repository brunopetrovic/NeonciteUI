import * as React from "react";
import { Highlight, themes, type PrismTheme } from "prism-react-renderer";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Neoncite Prism theme — maps token colors to the neon palette. */
const neonciteTheme: PrismTheme = {
  plain: {
    color: "#e5e5ea",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#636366", fontStyle: "italic" as const },
    },
    { types: ["punctuation"], style: { color: "#8e8e93" } },
    { types: ["namespace"], style: { opacity: 0.7 } },
    { types: ["property", "tag"], style: { color: "#ff2a9d" } }, // neon-pink
    { types: ["boolean", "number"], style: { color: "#ffcc00" } }, // neon-yellow
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "template-string"],
      style: { color: "#00ff66" },
    }, // neon-green
    { types: ["operator", "entity", "url", "variable"], style: { color: "#00f0ff" } }, // neon-cyan
    { types: ["atrule", "attr-value", "keyword"], style: { color: "#b829ff" } }, // neon-purple
    { types: ["function", "class-name"], style: { color: "#3399ff" } }, // neon-blue
    { types: ["regex", "important"], style: { color: "#ff6600" } }, // neon-orange
    { types: ["deleted"], style: { color: "#ff003c" } }, // neon-red
    { types: ["inserted"], style: { color: "#00ff66" } }, // neon-green
    { types: ["plain"], style: { color: "#e5e5ea" } },
  ],
};

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
}

export function CodeBlock({ code, language = "tsx", filename, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  // Map language aliases for Prism compatibility
  const prismLang = language === "sh" ? "bash" : language;

  return (
    <div
      className={cn(
        "relative group rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] overflow-hidden",
        "shadow-[inset_0_2px_8px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[color:var(--hairline)]/60 bg-gradient-to-b from-[#1c1c1e] to-[#121214] px-4 h-10">
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="neon-cyan font-bold">
            {language === "bash" || language === "sh" ? "$" : "<>"}
          </span>
          <span className="text-muted-foreground">{filename ?? language}</span>
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 h-7 px-2.5 rounded-[8px] text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={12} className="neon-green" /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <Highlight theme={neonciteTheme} code={code.trim()} language={prismLang}>
        {({ className: hlClass, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(hlClass, "overflow-x-auto p-4 text-[12.5px] leading-relaxed font-mono")}
            style={{ ...style, background: "transparent" }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
