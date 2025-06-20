"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { EmailAuthSchema } from "@/lib/zod/auth.zod";
import { cn } from "@/lib/utils";
import { requestCode } from "@/lib/actions/auth.actions";
import { useMounted } from "@/hooks/core/useMounted.hook";

import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/buttons/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form/form";
import { Loader } from "../ui/info/loader";

const Auth = () => {
  const { isMounted } = useMounted();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const form = useForm<z.infer<typeof EmailAuthSchema>>({
    resolver: zodResolver(EmailAuthSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: requestMagicCode, isPending } = useMutation({
    mutationFn: requestCode,
    onSuccess: ({ isSent }) => {
      if (isSent) {
        router.push("/auth/confirm-email");
      }
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = async (data: z.infer<typeof EmailAuthSchema>) => {
    localStorage.setItem("email", data.email);
    await requestMagicCode(data);
  };

  const handleGoogleAuth = () => {
    if (form.formState.isSubmitting) return;
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  useEffect(() => {
    if (!isMounted || !error) return;
    toast.error(decodeURIComponent(error));
    router.replace("/auth");
  }, [isMounted, error, toast]);

  return (
    <div className="space-y-10 text-center">
      <div>
        <h1 className="text-2xl font-semibold md:text-3xl">
          Enter your email to sign in
        </h1>
      </div>

      <div className={cn("space-y-6")}>
        <Form {...form}>
          <form
            className="space-y-5"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {isPending ? (
                <Loader type="ScaleLoader" height={10} color="#ffffff" />
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </Form>

        <div className="my-4 flex w-full items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-sm text-gray-500 uppercase">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <Button
          variant="outline"
          className="flex w-full items-center justify-center"
          type="button"
          onClick={() => handleGoogleAuth()}
        >
          <Image
            src="/assets/icons/google-icon-logo-transparent.png"
            alt="google-logo"
            width={40}
            height={40}
          />
          Continue with Google
        </Button>
      </div>
    </div>
  );
};

export default Auth;
