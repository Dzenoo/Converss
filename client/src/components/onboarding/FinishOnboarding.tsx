import Link from "next/link";

import { Button } from "@/components/ui/buttons/button";
import CodeSyntax from "../shared/CodeSyntax";

const FinishOnboarding = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-16 p-10 text-center">
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-semibold">
            🎉 Your AI Assistant is Ready!
          </h1>
        </div>
        <div>
          <p className="text-lg text-[var(--primary-gray)]">
            Your bot for your business is all set.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <p className="font-medium">👉 Next, install it on your website:</p>
        <div>
          <CodeSyntax
            codeSnippet={`<script src="https://yourapp.com/widget.js" data-assistant-id="xyz"></script>`}
          />
        </div>
        <p className="font-medium">
          💡 Paste this code before the head tag of your site.
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div>
          <Link href="/">
            <Button variant="outline">Test Your Bot</Button>
          </Link>
        </div>
        <div>
          <Link href="/">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinishOnboarding;
