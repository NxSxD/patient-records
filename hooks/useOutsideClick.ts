import { useEffect, useCallback } from "react";

export function useOutsideClick<T extends HTMLElement>(
  ref: React.MutableRefObject<T>,
  handler: EventListener
) {
  const targetGate = useCallback(
    (ev: MouseEvent) => {
      if (!ref.current || !ev.target) return;

      if (!ref.current.contains(ev.target as Node)) {
        handler(ev);
      }
    },
    [handler, ref]
  );

  useEffect(() => {
    if (!ref.current) return;

    document.addEventListener("click", targetGate);
    return () => document.removeEventListener("click", targetGate);
  }, [ref, targetGate]);
}
