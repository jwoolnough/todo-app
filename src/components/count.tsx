import { clsxm } from "@/utils/clsxm";

type CountProps = {
  count: number;
  className?: string;
};

const Count = ({ className, count }: CountProps) => (
  <span
    className={clsxm(
      "inline-block min-w-[1rem] rounded-full bg-green-500 px-1 text-center text-xs font-bold text-white",
      className,
    )}
  >
    {count > 99 ? "99+" : count}
  </span>
);

export { Count };
