import { useEffect, useRef, useState } from "react"

const DEFAULT = "@@default_media_query@@"

type Matches<Q extends Query> = Q extends string
  ? boolean | undefined
  : { [K in keyof Q]: boolean | undefined }

type MQLInfo = {
  mql: MediaQueryList
  handler: (mql: { matches: boolean }) => void
}

type Query = string | Record<string, string>

export const useMediaQuery = <Q extends Query>(query: Q) => {
  const mqls = useRef(new Map<string, MQLInfo>())
  const [mounted, setMounted] = useState(false)
  const [matches, setMatches] = useState({} as { [key: string]: boolean })

  useEffect(() => {
    const queries = (typeof query === "string"
      ? { [DEFAULT]: query }
      : query) as Record<string, string>

    Object.keys(queries).forEach(key => {
      const mql = window.matchMedia(queries[key])
      const handler = ({ matches }: { matches: boolean }) =>
        setMatches(m => ({ ...m, [key]: matches }))

      mql.addListener(handler)
      handler(mql)

      mqls.current.set(key, { mql, handler })
    })

    setMounted(true)

    return () => {
      mqls.current.forEach(info => info.mql.removeListener(info.handler as any))
    }
  }, [])

  return (typeof query === "string" ? matches[DEFAULT] : matches) as Matches<Q>
}
