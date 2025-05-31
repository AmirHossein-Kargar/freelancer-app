import { useEffect, useRef } from "react";

// * useOutsideClick is a custom hook that detects clicks outside of a specified element.
// * It takes a handler function to call when an outside click is detected and an optional
export default function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }

    document.addEventListener("click", handleClickOutside, listenCapturing);
    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside,
        listenCapturing
      );
  }, [handler, listenCapturing]);

  return ref;
}
