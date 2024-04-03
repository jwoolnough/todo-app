import { useSortable } from "@dnd-kit/sortable";
import type { Task } from "@prisma/client";
import { motion } from "framer-motion";

type DraggableItemProps = WithChildren & {
	task: Task;
};

const DraggableItem = ({ task, children }: DraggableItemProps) => {
	const { attributes, setNodeRef, listeners, transform, isDragging } =
		useSortable({
			id: task.id,
			data: task,
			transition: null,
		});

	// const initialStyles = {
	//   x: 0,
	//   y: 0,
	//   scale: 1,
	// };

	console.log(listeners);

	return (
		<motion.li
			ref={setNodeRef}
			initial={{ opacity: 0, height: 0 }}
			layoutId={task.id}
			animate={{
				opacity: isDragging ? 0 : 1,
				height: "auto",
				// ...(transform
				//   ? {
				//       x: transform.x,
				//       y: transform.y,
				//       scale: isDragging ? 1.05 : 1,
				//       zIndex: isDragging ? 1 : 0,
				//     }
				//   : initialStyles),
				// transition: { opacity: { delay: 0.2 } },
			}}
			exit={{
				opacity: 0,
				height: 0,
				transition: { height: { delay: 0.2 } },
			}}
			transition={{
				duration: !isDragging ? 0.2 : 0,
				easings: {
					type: "spring",
				},
				scale: {
					duration: 0.25,
				},
				zIndex: {
					delay: isDragging ? 0 : 0.2,
				},
			}}
			{...attributes}
			{...listeners}
		>
			{children}
		</motion.li>
	);
};

export { DraggableItem };
