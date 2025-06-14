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

const Register = () => {
  const form = useForm({});

  return (
    <div className="space-y-10 text-center">
      <div>
        <h1 className="text-3xl font-semibold">
          Create your account with email
        </h1>
      </div>

      <div className="space-y-6 px-10">
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
              Continue
            </Button>
          </form>
        </Form>

        <DividerWithText text="or" />

        <GoogleAuth>Sign up with Google</GoogleAuth>
      </div>

      <div>
        <p className="text-sm">
          Already have account?{" "}
          <Link href="/login" className="text-[var(--primary-blue)]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
