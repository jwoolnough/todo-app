import { AnimatePresence, motion } from "framer-motion";
import { useId } from "react";
import { FiChevronRight } from "react-icons/fi";

import { clsxm } from "@/utils/clsxm";

import { Box } from "./box";
import { Button } from "./button";

type AccordionProps = WithChildren & {
  boxProps?: React.ComponentProps<typeof Box>;
  header: React.ReactNode;
  isOpen?: boolean;
  onToggle: () => void;
};

const Accordion = ({
  boxProps,
  header,
  children,
  isOpen = false,
  onToggle,
}: AccordionProps) => {
  const id = useId();

  return (
    <Box {...boxProps}>
      <h4>
        <Button
          type="button"
          variant="link"
          onClick={onToggle}
          size="sm"
          className="w-full justify-start gap-2 font-bold"
          id={`accordion-header-${id}`}
          aria-expanded={isOpen}
          aria-controls={`accordion-panel-${id}`}
        >
          {header}
          <FiChevronRight
            size={22}
            className={clsxm(
              "ml-auto transition-transform",
              isOpen && "ml-auto rotate-90",
            )}
          />
        </Button>
      </h4>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            className={clsxm("before:block before:h-4")}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: { opacity: { delay: 0.2 } },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: { height: { delay: 0.2 } },
            }}
            id={`accordion-panel-${id}`}
            role="region"
            aria-labelledby={`accordion-header-${id}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export { Accordion };
