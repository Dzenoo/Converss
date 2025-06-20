"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { ConfirmEmailCodeSchema } from "@/lib/zod/auth.zod";
import { verifyCode } from "@/lib/actions/auth.actions";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/form/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form/form";
import { Button } from "../ui/buttons/button";
import { Loader } from "../ui/info/loader";

const ConfirmEmail = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof ConfirmEmailCodeSchema>>({
    resolver: zodResolver(ConfirmEmailCodeSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  const { mutateAsync: verifyMagicCode, isPending } = useMutation({
    mutationFn: verifyCode,
    onSuccess: ({ redirectTo }) => {
      router.push(redirectTo);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = async (data: z.infer<typeof ConfirmEmailCodeSchema>) => {
    const email = localStorage.getItem("email");
    if (!email) return;
    await verifyMagicCode({ email, code: data.code });
  };

  return (
    <div className="space-y-10 text-center max-sm:px-5">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">
            Enter the code sent to your email
          </h1>
        </div>
        <div className="max-w-xl">
          <p className="text-sm font-light md:text-base">
            We sent an email to you. Enter the code here to continue. If you
            dont see it, check your spam or junk folder.
          </p>
        </div>
      </div>
      <div className="justify-self-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!form.formState.isValid}>
              {isPending ? (
                <Loader type="ScaleLoader" height={10} color="#ffffff" />
              ) : (
                "Verify"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmEmail;
