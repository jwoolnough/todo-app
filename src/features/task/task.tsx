import { cn } from "~/utils";

type TaskProps = {
  title: string;
  description?: string;
  note?: string;
  className?: string;
};

const Task = ({ title, description, note, className }: TaskProps) => {
  return (
    <div className={cn("rounded-lg bg-navy-800 px-3 py-1.5", className)}>
      <div className="flex">
        <h5 className="line-clamp-2 text-base font-regular">{title}</h5>
      </div>
      {description && <p className="text-xs">{description}</p>}
    </div>
  );
};

export { Task };
