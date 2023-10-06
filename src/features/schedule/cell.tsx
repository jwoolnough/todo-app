import { clsxm } from "@/utils/clsxm";

type CellProps = WithChildren & {
  className?: string;
};

const Cell = ({ children, className }: CellProps) => {
  return <div className={clsxm("border-t p-1", className)}>{children}</div>;
};

export { Cell };
