"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ConfirmEmailCodeSchema } from "@/lib/zod/auth.zod";

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

const ConfirmEmail = () => {
  const form = useForm<z.infer<typeof ConfirmEmailCodeSchema>>({
    resolver: zodResolver(ConfirmEmailCodeSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  const code = form.watch("code");

  const handleSubmit = async (data: z.infer<typeof ConfirmEmailCodeSchema>) => {
    console.log(data);
  };

  useEffect(() => {
    if (code.length === 6) {
      form.handleSubmit(handleSubmit)();
    }
  }, [code, form, handleSubmit]);

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
          <form className="space-y-5">
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
          </form>
        </Form>
      </div>
      <div className="text-sm">
        Cant find code?{" "}
        <button className="cursor-pointer text-[var(--primary-blue)]">
          Resend
        </button>
      </div>
    </div>
  );
};

export default ConfirmEmail;
