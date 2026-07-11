import { useState } from "react";

export function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div className={`relative group ${className ?? ""}`}>
      <pre className="bg-muted rounded-md p-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">{children}</pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md border border-dark bg-teikos-blue/25 px-2 py-0.5 text-xs font-semibold text-dark opacity-0 shadow-[1px_1px_0_0_rgba(26,26,26,0.45)] transition-all duration-150 group-hover:opacity-100 hover:-translate-y-px hover:bg-teikos-blue/40"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
