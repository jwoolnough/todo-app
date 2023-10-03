import { clsxm } from "@/utils/clsxm";

const AuthLayout = ({ children }: WithChildren) => (
  <div className={clsxm("flex min-h-[100dvh] flex-col items-center p-4")}>
    {children}
    <div
      className="absolute inset-0 -z-10 m-auto h-[30vh] w-[60vw] blur-[85px]"
      style={{
        backgroundImage: `linear-gradient(
            106.89deg,
            rgba(192,132,252,0.11) 15.73%,
            rgba(14,165,233,0.41) 15.74%,
            #50ac6944 56.49%,
            rgba(79,70,229,0.4) 115.91%
          )`,
      }}
    ></div>
  </div>
);

export { AuthLayout };
