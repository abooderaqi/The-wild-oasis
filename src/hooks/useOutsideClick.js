import { useEffect, useRef } from "react"

export function useOutsideClick(handler, listeningCapturing = true) {
  const ref = useRef()
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler()
      }
    }
    // the event will handling in the capturing phase(down the tree) rather than the bubbling phase
    document.addEventListener("click", handleClick, listeningCapturing)

    return () =>
      document.removeEventListener("click", handleClick, listeningCapturing)
  }, [handler, listeningCapturing])

  return ref
}
