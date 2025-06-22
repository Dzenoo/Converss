"use client";

import { useRouter } from "next/navigation";

import { finishOnboarding } from "@/lib/actions/bot.actions";

import CodeSyntax from "@/components/shared/CodeSyntax";

import { Button } from "@/components/ui/buttons/button";

interface FinishOnboardingProps {
  token: string;
  botId?: string;
  widgetUrl?: string;
}

const FinishOnboarding: React.FC<FinishOnboardingProps> = ({
  token,
  botId = "your-bot-id",
  widgetUrl = "https://yourapp.com/widget.js",
}) => {
  const router = useRouter();
  const codeSnippet = `<script src="${widgetUrl}" data-bot-id="${botId}"></script>`;

  async function handleFinishOnboarding() {
    if (!token) return;

    try {
      await finishOnboarding({ token });
      router.refresh();
    } catch (err) {
      console.error("Error finishing onboarding:", err);
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-16 p-10 text-center max-md:p-5">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            🎉 Your AI bot is Ready!
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
          💡 Paste this code before the closing &lt;/head&gt; tag of your site.
        </p>
      </div>

      <div>
        <Button onClick={handleFinishOnboarding} disabled={!token}>
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default FinishOnboarding;
