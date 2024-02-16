import { clsxm } from "@/utils/clsxm";

const AuthLayout = ({ children }: WithChildren) => (
  <div className={clsxm("flex min-h-[100dvh] flex-col items-center p-4")}>
    {children}
  </div>
);

export { AuthLayout };
