import { create } from "zustand";

interface PanelStore {
  panelIsOpen: boolean;
  setPanelIsOpen: (panelIsOpen: boolean) => void;
}

// Typing zustand stores requires this currying hack workaround
// https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md
const usePanelStore = create<PanelStore>()((set) => ({
  panelIsOpen: false,
  setPanelIsOpen: (panelIsOpen) => set({ panelIsOpen }),
}));

export { usePanelStore };
