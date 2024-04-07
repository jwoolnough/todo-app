import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

import { Button } from "~/components/button";

import { APP_NAME } from "~/constants";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-navy-500/40 to-navy-900/50 p-6">
      <form action="" className="relative isolate my-auto max-w-[240px]">
        <div className="pointer-events-none absolute left-1/2 top-4 -z-10 h-[160px] w-[320px] -translate-x-1/2 -translate-y-1/2 bg-green-300/20 blur-[100px]"></div>

        <Image
          src="/logo.svg"
          width={32}
          height={42}
          alt={APP_NAME}
          className="drop-shadow-neon mx-auto mb-8 block"
        />

        <h1 className="text-center">Sign in to {APP_NAME}</h1>

        <Button className="mt-8 w-full">
          <FaGoogle className="mr-3 size-4" />
          Continue with Google
        </Button>
        <Button variant="secondary" className="mt-4 w-full">
          Continue with email
        </Button>
      </form>

      <p className="mt-6 text-balance text-center text-navy-500">
        By continuing, you agree to the {APP_NAME}&apos;s{" "}
        <Link
          href="/"
          className="underline underline-offset-2 hover:text-navy-300"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/"
          className="underline underline-offset-2 hover:text-navy-300"
        >
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
