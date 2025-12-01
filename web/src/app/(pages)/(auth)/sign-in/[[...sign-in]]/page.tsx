// Imports
"use client";

import React from "react";
import { GalleryVerticalEnd, Eye, EyeOff } from "lucide-react";
import { useSignIn, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// Component definition
export default function SigninPage() {
  // Router hook
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const { signIn, isLoaded, setActive } = useSignIn();
  const [email, setEmail] = React.useState(searchParams.get("email") || "");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [step, setStep] = React.useState<string>("email");
  const [showPassword, setShowPassword] = React.useState(false);
  const [resetMessage, setResetMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    setError(null);
    try {
      const result = await signIn.create({
        identifier: email,
      });
      if (result.status === "needs_first_factor") {
        setStep("password");
      } else if (result.status === "needs_second_factor") {
        // Handle 2FA if needed
      }
    } catch (err: any) {
      if (err.errors?.[0]?.code === "identifier_not_found") {
        router.push('/sign-up?email=' + encodeURIComponent(email));
      } else {
        setError(err.errors[0]?.longMessage || "Something went wrong");
      }
    }
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }
    setError(null);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "password",
        password,
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        setError("Invalid password");
      }
    } catch (err: any) {
      setError(err.errors[0]?.longMessage || "Invalid password");
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setError("Please enter your email first.");
      return;
    }
    setError(null);
    try {
      await signIn.resetPassword({ email });
      setResetMessage("Password reset email sent. Check your inbox.");
    } catch (err: any) {
      setError(err.errors[0]?.longMessage || "Failed to send reset email");
    }
  }

  // Render section
  return (
    // Main container
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Acme Inc.
        </a>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Sign in to your account</CardTitle>
            <CardDescription>
              Enter your email below to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "email" ? (
              <form onSubmit={handleEmailSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Field>
                  <Field>
                    <Button type="submit">Continue</Button>
                    <FieldDescription className="text-center">
                      Don't have an account? <Link href="/sign-up">Sign up</Link>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            ) : (
              <form onSubmit={handlePasswordSubmit}>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </Field>
                  <Field>
                    <Button type="submit">Sign In</Button>
                    <FieldDescription className="text-center">
                      <button
                        type="button"
                        onClick={() => setStep("email")}
                        className="text-blue-500 underline"
                      >
                        Back to email
                      </button>
                      <br />
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        className="text-blue-500 underline"
                      >
                        Forgot password?
                      </button>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {resetMessage && <p className="text-green-500">{resetMessage}</p>}
          </CardContent>
        </Card>
        <FieldDescription className="px-6 text-center">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </FieldDescription>
      </div>
    </div>
  );
}
