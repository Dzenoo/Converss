"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

import { Button } from "@/components/ui/buttons/button";

interface CodeSyntaxProps {
  codeSnippet: string;
  language?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

const CodeSyntax: React.FC<CodeSyntaxProps> = ({
  codeSnippet,
  language = "html",
  showLineNumbers = false,
  maxHeight = "400px",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-lg border border-gray-700 bg-gray-900 shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-2">
          <span className="font-mono text-xs tracking-wide text-gray-400 uppercase">
            {language}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={copied}
            className="h-8 px-3 text-xs text-gray-300 transition-colors duration-200 hover:bg-gray-700 hover:text-white"
          >
            {copied ? (
              <>
                <Check size={14} className="mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={14} className="mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>

        <div className="overflow-auto" style={{ maxHeight }}>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={showLineNumbers}
            wrapLines={false}
            wrapLongLines={false}
          >
            {codeSnippet}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeSyntax;
