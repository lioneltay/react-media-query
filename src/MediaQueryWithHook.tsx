import React from "react"
import { useMediaQuery } from "./useMediaQuery"

type QueryProp = string | Record<string, string>
type Matches<Q extends QueryProp> = Q extends string
  ? boolean
  : { [K in keyof Q]: boolean }

interface ChildProps<Q extends QueryProp> {
  matches: Matches<Q>
}

interface Props<Q extends QueryProp> {
  children: ((props: ChildProps<Q>) => React.ReactNode)
  query: Q
}

export const MediaQueryWithHook = <Q extends QueryProp>({
  children,
  query,
}: Props<Q>): React.ReactNode => {
  const matches = useMediaQuery(query)
  if (
    typeof matches === "undefined" ||
    (typeof matches === "object" &&
      Object.values(matches as any).some(match => typeof match === "undefined"))
  ) {
    return null
  }

  return children({ matches: matches as Matches<Q> })
}
