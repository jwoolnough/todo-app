import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

import { Button } from "@/components/button";

import { AuthLayout } from "@/features/auth";

import { type NextPageWithLayout } from "./_app";

const LoginPage: NextPageWithLayout = () => {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const redirect =
        typeof router.query.redirect === "string" && router.query.redirect;

      await signIn("google", {
        callbackUrl: redirect ? decodeURIComponent(redirect) : "/",
      });
    } catch (e) {
      console.log(e);
      toast.error("Unable to login, please try again");
    }
  };

  return (
    <>
      <Head>
        <title>Login | Todo App</title>
        <meta name="description" content="" />
      </Head>

      <h1 className="mb-6 mt-auto text-center text-2xl font-bold text-white md:text-3xl">
        Todo App is a productivity and task management tool
      </h1>
      <Button
        type="button"
        size="lg"
        className="mb-auto max-w-xl"
        onClick={() => void handleLogin()}
      >
        <FaGoogle />
        Login with Google
      </Button>
    </>
  );
};

LoginPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default LoginPage;
