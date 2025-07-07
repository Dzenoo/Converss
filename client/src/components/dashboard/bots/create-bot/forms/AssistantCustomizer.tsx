import { Control } from "react-hook-form";

import { cn } from "@/lib/utils";
import { AssistantTonesData } from "@/constants";

import { CreateBotValues } from "./CreateBotForm";

import { Input } from "@/components/ui/form/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";

type AssistantCustomizerProps = {
  control: Control<CreateBotValues>;
};

const AssistantCustomizer: React.FC<AssistantCustomizerProps> = ({
  control,
}) => {
  return (
    <>
      <FormField
        control={control}
        name="tone"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Assistant Tone</FormLabel>
            <FormControl>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {AssistantTonesData.map((tone) => {
                  const toneLabel = tone.label.toLowerCase();
                  const isSelected = field.value === toneLabel;

                  return (
                    <div
                      key={tone.id}
                      className={cn(
                        "cursor-pointer space-y-3 rounded-lg border p-6 transition-all",
                        isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300",
                      )}
                      onClick={() => field.onChange(toneLabel)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "h-4 w-4 rounded-full border",
                            isSelected
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300",
                          )}
                        >
                          {isSelected && (
                            <div className="h-full w-full scale-50 rounded-full bg-white"></div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{tone.label}</h3>
                          <tone.icon size={18} />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-[var(--primary-gray)]">
                          {tone.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="primaryRole"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Primary Role</FormLabel>
            <FormControl>
              <Input
                placeholder="Customer support, sales assistant, tech support..."
                {...field}
              />
            </FormControl>
            <FormDescription>
              Describe the main function of your assistant (e.g., sales,
              support).
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-5 max-md:flex-col">
        <FormField
          control={control}
          name="greetingMessage"
          render={({ field }) => (
            <FormItem className="w-full space-y-2">
              <FormLabel>Greeting Message</FormLabel>
              <FormControl>
                <Input
                  placeholder="Hello! How may I assist you today?..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This message will be shown to users when they first interact
                with your assistant.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="fallbackMessage"
          render={({ field }) => (
            <FormItem className="w-full space-y-2">
              <FormLabel>Fallback Message</FormLabel>
              <FormControl>
                <Input
                  placeholder="I apologize, but I don't understand that request..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This message will be shown when the assistant doesn't understand
                a user's request.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default AssistantCustomizer;
