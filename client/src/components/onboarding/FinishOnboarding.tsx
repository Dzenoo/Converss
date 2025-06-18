import Link from "next/link";

import { Button } from "@/components/ui/buttons/button";
import CodeSyntax from "../shared/CodeSyntax";

const FinishOnboarding = () => {
  // This would typically come from props or context in a real app
  const assistantId = "xyz"; // Replace with actual assistant ID
  const widgetUrl = "https://yourapp.com/widget.js"; // Replace with actual widget URL

  const codeSnippet = `<script src="${widgetUrl}" data-assistant-id="${assistantId}"></script>`;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-16 p-10 text-center max-md:p-5">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            🎉 Your AI Assistant is Ready!
          </h1>
        </div>
        <div>
          <p className="text-base text-[var(--primary-gray)] sm:text-lg lg:text-xl dark:text-gray-300">
            Your bot for your business is all set and ready to help your
            customers.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <p className="font-medium">👉 Next, install it on your website:</p>
        <div className="max-sm:max-w-xl">
          <CodeSyntax codeSnippet={codeSnippet} language="html" />
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
