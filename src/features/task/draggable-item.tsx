import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";

const DraggableItem = ({ id, children }: { id: string } & WithChildren) => {
  const { attributes, setNodeRef, listeners, transform, isDragging } =
    useSortable({
      id,
      transition: null,
    });

  const initialStyles = {
    x: 0,
    y: 0,
    scale: 1,
  };

  return (
    <motion.li
      ref={setNodeRef}
      initial={{ opacity: 0, height: 0 }}
      layoutId={id}
      animate={{
        opacity: 1,
        height: "auto",
        ...(transform
          ? {
              x: transform.x,
              y: transform.y,
              scale: isDragging ? 1.05 : 1,
              zIndex: isDragging ? 1 : 0,
            }
          : initialStyles),
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
      // {...attributes}
      // {...listeners}
    >
      {children}
    </motion.li>
  );
};

export { DraggableItem };
