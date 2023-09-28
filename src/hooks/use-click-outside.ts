import { type RefObject, useEffect } from "react";

type Handler = (event: MouseEvent) => void;

/**
 * Detect clicks anywhere outside of an element
 * @param {Object} ref - The ref of the element to detect outside clicks
 * @param {Function} handler - Executed on outside click
 */
const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: Handler,
): void => {
  useEffect(() => {
    const el = ref?.current;

    const clickHandler: Handler = (e) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(e.target as Node)) {
        return;
      }

      handler(e);
    };

    window.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("click", clickHandler);
    };
  }, [ref]);
};

export { useClickOutside };
