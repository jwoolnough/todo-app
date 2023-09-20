import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

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
      <button
        type="button"
        onClick={() => void handleLogin()}
        className="inline-flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-200 hover:text-slate-950"
      >
        <FaGoogle />
        Login with Google
      </button>
    </>
  );
};

LoginPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default LoginPage;
