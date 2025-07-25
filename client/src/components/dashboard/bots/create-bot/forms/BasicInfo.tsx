import { Control } from "react-hook-form";

import { industries } from "@/constants";
import { CreateBotValues } from "@/lib/zod/bots";

import { Textarea } from "@/components/ui/form/textarea";
import { Input } from "@/components/ui/form/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/form/select";

type BasicInfoProps = {
  control: Control<CreateBotValues>;
};

const BasicInfo: React.FC<BasicInfoProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="businessName"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Business Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your business name..." {...field} />
            </FormControl>
            <FormDescription>
              This will be used to personalize your AI assistant. For example:
              <br />
              <span className="text-sm text-[var(--primary-gray)] italic">
                “Hi! I'm the assistant for Daves Dog Grooming.”
              </span>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="businessDescription"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Business Description</FormLabel>
            <FormControl>
              <Textarea
                className="max-h-36 min-h-36 resize-none"
                placeholder="Tell us a bit about your business shortly..."
                {...field}
              />
            </FormControl>
            <FormDescription>
              Describe what your business offers in 1 or 2 sentences. This helps
              shape how the assistant responds to questions.
              <br />
              Example:{" "}
              <span className="text-sm text-[var(--primary-gray)] italic">
                “We groom dogs of all sizes and offer nail trimming, baths, and
                more.”
              </span>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="businessWebsite"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel>Business Website</FormLabel>
            <FormControl>
              <Input placeholder="Enter your business website..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="industry"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Industry</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <SelectTrigger className="w-full capitalize">
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry, i) => (
                    <SelectItem key={i} value={industry} className="capitalize">
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>
              Choosing the right industry helps us tailor the assistant tone and
              examples to your business type.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default BasicInfo;
