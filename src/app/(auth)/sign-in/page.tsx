"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/lib/tanstack-query/mutations/use-auth";
import { loginSchema } from "@/lib/schemas/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"]
})

function SignInPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      username: ""
    },
    reValidateMode: "onChange"
  });

  const loginMutation = useLoginMutation();

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    loginMutation.mutate({ ...values }, {
      onSuccess: (_data,) => {
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 p-8 lg:p-16">
            <div className="flex items-center justify-between mb-8">
              <Link href="/">
                <span className={cn("text-2xl font-semibold", poppins.className)}>
                  funroad
                </span>
              </Link>
              <Button asChild variant={'ghost'} size={'sm'} className="text-base border-none underline">
                <Link href="/sign-up">
                  Sign Up</Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">Welcome back to Funroad!</h1>
            <FormField name="username" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="password" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" size={'lg'} variant={'elevated'} className="bg-black text-white hover:bg-pink-400 hover:text-primary">Sign In</Button>
          </form>
        </Form>
      </div>
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
      </div>
    </div>
  )
}

export default SignInPage