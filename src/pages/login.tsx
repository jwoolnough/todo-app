import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  return (
    <>
      <button
        type="button"
        onClick={() => void signIn("google")}
        className="inline-flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 font-medium text-white transition hover:bg-green-200 hover:text-slate-950"
      >
        <FaGoogle />
        Login with Google
      </button>
    </>
  );
}
