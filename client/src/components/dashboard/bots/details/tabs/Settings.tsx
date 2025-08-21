import { useRouter } from "next/navigation";

import {
  BotMutationType,
  useBotMutation,
} from "@/hooks/mutations/useBot.mutation";

import { Button } from "@/components/ui/buttons/button";
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
} from "@/components/ui/info/alert-dialog";
import { Loader } from "@/components/ui/info/loader";

const Settings: React.FC<{ data: { botId: string } }> = ({
  data: { botId },
}) => {
  const router = useRouter();

  const botMutation = useBotMutation({
    onSuccess() {
      router.push("/dashboard");
    },
  });

  async function deleteBotHandler() {
    await botMutation.mutateAsync({
      type: BotMutationType.DELETE,
      data: { botId },
    });
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-sm text-[var(--primary-gray)]">
          Configure and customize your bot&apos;s behavior and preferences.
        </p>
      </div>

      <div className="flex items-center justify-between gap-5 rounded-lg border p-5 max-md:flex-col">
        <div className="space-y-1">
          <h2 className="font-medium">Delete bot</h2>
          <p className="text-sm text-[var(--primary-gray)]">
            Deleting the bot will delete all documents indexed against it and
            all history.
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="max-md:w-full" variant={"destructive"}>
              Delete bot
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Deleting a bot is a danger action that cannot be reversed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteBotHandler}>
                {botMutation.isPending ? (
                  <Loader type="ScaleLoader" height={10} color="#ffffff" />
                ) : (
                  "Continue"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Settings;
