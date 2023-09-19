import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div>
      <button type="button" onClick={() => void signIn("google")}>
        <FaGoogle />
        Login with Google
      </button>
    </div>
  );
}
