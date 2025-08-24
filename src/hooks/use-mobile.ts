import * as React from "react"

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1024;

export function useIsMobile(breakpoint: "mobile" | "desktop" = "mobile") {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  const BREAKPOINT = breakpoint === "mobile" ? MOBILE_BREAKPOINT : DESKTOP_BREAKPOINT;

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [BREAKPOINT])

  return !!isMobile
}
