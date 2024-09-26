"use client";

import Image from "next/image"

import { Label } from "@/components/ui/label"


export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image."

import * as z from "zod";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSucess } from "@/components/form-sucess";

import { login } from "@/actions/login";

const LoginForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different Provider!"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl )
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <section className="bg-white relative ">
    <div className=" mt-[14vh] h-screen bg-white w-full absolute right-[200px] ">
        <CardWrapper
          headerLabel="Welcome back"
          backButtonLabel="Don't have an account?"
          backButtonHref="/auth/register"
          showSocial
          // className="bg-gray-50 border border-gray-200 shadow-lg rounded-lg p-6" // Light theme styling for CardWrapper
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {showTwoFactor && (
                  <>
                    {/* 2FA */}
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800">Two Factor Code</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="123456"
                              className="border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-300" // Light theme styles
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                {!showTwoFactor && (
                  <>
                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="john.doe@example.com"
                              type="email"
                              className="border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-300" // Light theme styles
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800">Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="******"
                              type="password"
                              className="border border-gray-300 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-300" // Light theme styles
                            />
                          </FormControl>
                          <Button
                            size="sm"
                            variant="link"
                            asChild
                            className="px-0 font-normal text-blue-600 hover:text-blue-700" // Light theme link style
                          >
                            <Link href="/auth/reset">Forgot password?</Link>
                          </Button>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              <FormError message={error || urlError} />
              <FormSucess message={success} />
              <Button
                disabled={isPending}
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md"
              >
                {showTwoFactor ? "Confirm" : "Login"}
              </Button>
            </form>
          </Form>
        </CardWrapper>
</div>
</section>

  );
}; 

export default LoginForm;
