"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import GoogleAuth from "../GoogleAuth";

import { Input } from "@/components/ui/form/input";
import { Button } from "@/components/ui/buttons/button";
import { DividerWithText } from "@/components/ui/info/divider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";

const Login = () => {
  const form = useForm({});

  return (
    <div className="space-y-10 text-center">
      <div>
        <h1 className="text-3xl font-semibold">Enter your email to sign in</h1>
      </div>

      <div className="space-y-6">
        <Form {...form}>
          <form className="space-y-5">
            <FormField
              name=""
              render={({}) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address..." />
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign In With Email
            </Button>
          </form>
        </Form>

        <DividerWithText text="or sign in with" />

        <GoogleAuth>Sign in with Google</GoogleAuth>
      </div>

      <div>
        <p className="text-sm">
          Dont have account?{" "}
          <Link href="/register" className="text-[var(--primary-blue)]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
