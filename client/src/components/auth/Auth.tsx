"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { EmailAuthSchema } from "@/lib/zod/auth.zod";

import GoogleAuth from "./GoogleAuth";

import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/buttons/button";
import { DividerWithText } from "@/components/ui/info/divider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form/form";
import { cn } from "@/lib/utils";

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

  const onSubmit = async (data: z.infer<typeof EmailAuthSchema>) => {
    if (isLogin) {
      console.log("Login");
    } else {
      console.log("Register");
    }
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
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
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

        <DividerWithText text={isLogin ? "or sign in with" : "or"} />

        <GoogleAuth>Sign {isLogin ? "in" : "up"} with Google</GoogleAuth>
      </div>

      <div>
        <p className="text-sm">
          {isLogin ? "Dont" : "Already"} have account?{" "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="text-[var(--primary-blue)]"
          >
            {isLogin ? "Register" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
