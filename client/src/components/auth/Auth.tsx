"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { EmailAuthSchema } from "@/lib/zod/auth.zod";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/buttons/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form/form";

type AuthProps = {
  isLogin: boolean;
};

const Auth: React.FC<AuthProps> = ({ isLogin }) => {
  const form = useForm<z.infer<typeof EmailAuthSchema>>({
    resolver: zodResolver(EmailAuthSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof EmailAuthSchema>) => {
    if (isLogin) {
      console.log("Login");
    } else {
      console.log("Register");
    }
  };

  const handleGoogleAuth = () => {
    // window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="space-y-10 text-center">
      <div>
        <h1 className="text-3xl font-semibold">
          {isLogin
            ? "Enter your email to sign in"
            : "Create your account with email"}
        </h1>
      </div>

      <div className={cn("space-y-6", !isLogin && "px-10")}>
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
              {isLogin ? "Sign In With Email" : "Continue"}
            </Button>
          </form>
        </Form>

        <div className="my-4 flex w-full items-center">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-sm text-gray-500 uppercase">
            {isLogin ? "or sign in with" : "or"}
          </span>
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
          Sign {isLogin ? "in" : "up"} with Google
        </Button>
      </div>

      <div className="text-sm">
        {isLogin ? "Dont" : "Already"} have account?{" "}
        <Link
          href={isLogin ? "/register" : "/login"}
          className="text-[var(--primary-blue)]"
        >
          {isLogin ? "Register" : "Login"}
        </Link>
      </div>
    </div>
  );
};

export default Auth;
