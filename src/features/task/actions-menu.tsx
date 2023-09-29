import { useRef, useState } from "react";
import { FiFileText, FiMoreVertical, FiTrash } from "react-icons/fi";

import { useClickOutside } from "@/hooks/use-click-outside";

import { IconButton } from "@/components/button";
import { Tippy } from "@/components/tippy";

import { clsxm } from "@/utils/clsxm";

type MenuItemProps = {
  renderIcon: (renderIconProps: {
    className: string;
    size: number;
  }) => React.ReactNode;
  onClick?: () => void;
  children: React.ReactNode;
};

const MenuItem = ({ renderIcon, onClick, children }: MenuItemProps) => (
  <li className="-mx-1">
    <button
      onClick={onClick}
      type="button"
      className=" flex w-full items-center whitespace-nowrap rounded-sm px-2 py-1 hover:bg-white/10"
    >
      {renderIcon({ className: "mr-2 text-slate-400 shrink-0", size: 16 })}{" "}
      {children}
    </button>
  </li>
);

type ActionsMenuProps = {
  onDelete: () => void;
  onAddNote: () => void;
};

const ActionsMenu = ({ onAddNote, onDelete }: ActionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={menuRef} className="relative z-10">
      <Tippy
        visible={isOpen}
        placement="bottom"
        interactive
        appendTo={(ref) => {
          // To fix z-index clipping issues, grab the grandparent which does not
          // have `position: relative` on it
          const grandparent = ref.parentNode?.parentNode;

          return grandparent ? (grandparent as Element) : document.body;
        }}
        className="z-10 text-left text-sm"
        content={
          <ul>
            <MenuItem
              onClick={onAddNote}
              renderIcon={(props) => <FiFileText {...props} />}
            >
              Add note
            </MenuItem>
            <MenuItem
              onClick={onDelete}
              renderIcon={(props) => <FiTrash {...props} />}
            >
              Delete
            </MenuItem>
          </ul>
        }
      >
        <IconButton
          label="More"
          variant="link"
          size="sm"
          withTippy={false}
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className={clsxm(
            "block text-slate-700 opacity-0 transition hover:text-slate-400 group-focus-within:opacity-100 group-hover:opacity-100",
            isOpen && "opacity-100",
          )}
        >
          <FiMoreVertical size={20} />
        </IconButton>
      </Tippy>
    </div>
  );
};

export { ActionsMenu };
