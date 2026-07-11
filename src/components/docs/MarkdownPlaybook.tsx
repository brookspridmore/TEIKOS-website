import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

interface MarkdownPlaybookProps {
  markdown: string;
  className?: string;
}

export function MarkdownPlaybook({ markdown, className }: MarkdownPlaybookProps) {
  return (
    <div
      className={cn(
        "prose prose-sm max-w-none text-foreground",
        "prose-headings:font-heading prose-headings:font-semibold prose-headings:text-dark",
        "prose-p:text-dark/70 prose-p:leading-relaxed",
        "prose-li:text-dark/70",
        "prose-strong:text-dark",
        "prose-a:text-teikos-blue-deep prose-a:font-medium hover:prose-a:underline",
        className,
      )}
    >
      <ReactMarkdown
        components={{
          pre: ({ children }) => <>{children}</>,
          code({ className: codeClass, children, ...props }) {
            const isBlock = Boolean(codeClass?.includes("language-"));
            if (isBlock) {
              const txt = String(children).replace(/\n$/, "");
              return (
                <div className="not-prose my-3 w-full">
                  <CodeBlock>{txt}</CodeBlock>
                </div>
              );
            }
            return (
              <code className="text-xs bg-muted px-1 rounded font-mono text-dark" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
