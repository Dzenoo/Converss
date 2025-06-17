"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/buttons/button";

const CodeSyntax: React.FC<{
  codeSnippet: string;
}> = ({ codeSnippet }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="relative rounded-md bg-gray-900 p-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopy}
        className="absolute top-1 right-1 z-10 p-2 text-xs text-white"
      >
        {copied ? "Copied!" : <Copy size={10} />}
      </Button>
      <SyntaxHighlighter
        language="html"
        style={vscDarkPlus}
        customStyle={{ margin: 0, background: "transparent" }}
      >
        {codeSnippet}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSyntax;
