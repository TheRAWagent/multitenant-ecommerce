"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { verifyAccountSchema } from "@/lib/schemas/auth";
import { cn } from "@/lib/utils";
import { useResendOtpMutation, useVerifyAccountMutation } from "@/lib/tanstack-query/mutations/use-auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"]
})

function SignUpPage() {
  const params = useSearchParams();
  const username = params.get("username");
  const email = params.get("email");

  const router = useRouter();
  const form = useForm<z.infer<typeof verifyAccountSchema>>({
    mode: "all",
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      username: username || "",
      code: ""
    },

    reValidateMode: "onChange"
  });

  const verifyAccountMutation = useVerifyAccountMutation();
  const resendOtpMutation = useResendOtpMutation();

  const [resendCooldown, setResendCooldown] = useState(60);

  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setInterval(() => {
      setResendCooldown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  if (!username || !email) {
    router.push("/sign-in");
  }

  const onSubmit = (values: z.infer<typeof verifyAccountSchema>) => {
    verifyAccountMutation.mutate(values, { onSuccess: () => router.push("/sign-in") });
  };

  const onResendOtp = () => {
    resendOtpMutation.mutate({ username: username! }, { onSuccess: () => setResendCooldown(60) });
  }

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
                <Link href="/sign-in">
                  Sign In</Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">Verify your account</h1>
            <FormField name="code" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">OTP</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} minLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="w-full flex flex-row items-start justify-between">
                  <p className="text-sm">
                    Enter the OTP sent to your email <strong>{email}</strong>
                  </p>
                  {resendCooldown > 0 ? (
                    <p>You need to wait <strong>{resendCooldown} seconds</strong> to resend confirmation code</p>
                  ) : (
                    <p onClick={onResendOtp} className="underline cursor-pointer"><strong>Resend code</strong></p>
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" size={'lg'} variant={'elevated'} className="bg-black text-white hover:bg-pink-400 hover:text-primary">Verify</Button>
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

export default SignUpPage