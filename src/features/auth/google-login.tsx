"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

import { Button } from "~/components";

type GoogleLoginProps = {
  redirect?: string;
};

const GoogleLogin = ({ redirect }: GoogleLoginProps) => {
  const handleClick = async () => {
    try {
      await signIn("google", {
        callbackUrl: redirect ? decodeURIComponent(redirect) : "/",
      });
    } catch {
      toast.error("Unable to login", {
        description: "Please try again or contact support",
        duration: Infinity,
      });
    }
  };

  return (
    <Button className="mt-8 w-full" onClick={handleClick}>
      <FaGoogle className="mr-3 size-4" />
      Continue with Google
    </Button>
  );
};

export { GoogleLogin };
