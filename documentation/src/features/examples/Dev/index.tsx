import React, { Fragment } from "react"
import { MediaQuery, useMediaQuery } from "@tekktekk/react-media-query"
import styled from "styled-components"

const Status = styled.div<{ matches: boolean }>`
  margin: 10px;
  background: ${({ matches }) => (matches ? "lightgreen" : "tomato")};
`

export default class DevDemo extends React.Component {
  render() {
    return (
      <div>
        <h1>DevDemo</h1>

        <h2>RenderProps</h2>
        <div>
          <MediaQuery query="(min-width: 1000px)">
            {({ matches }) => <Status matches={matches}>>= 1000px</Status>}
          </MediaQuery>

          <MediaQuery query="(min-width: 1100px)">
            {({ matches }) => <Status matches={matches}>>= 1100px</Status>}
          </MediaQuery>

          <MediaQuery
            query={{
              medium: "(min-width: 1000px)",
              large: "(min-width: 1100px)",
            }}
          >
            {({ matches }) => (
              <Fragment>
                <Status matches={matches.medium}>>= 1000px</Status>
                <Status matches={matches.large}>>= 1100px</Status>
              </Fragment>
            )}
          </MediaQuery>
        </div>

        <HooksDemo />
      </div>
    )
  }
}

const HooksDemo = () => {
  const small = useMediaQuery("(min-width: 1000px)")
  const medium = useMediaQuery("(min-width: 1100px)")
  const obj = useMediaQuery({
    small: "(min-width: 1000px)",
    medium: "(min-width: 1100px)",
  })

  if (
    typeof small === 'undefined' ||
    typeof medium === 'undefined' ||
    typeof obj.small === 'undefined' ||
    typeof obj.medium === 'undefined'
  ) {
    return null
  }

  return (
    <div>
      <h2>Hooks Demo</h2>
      <Status matches={small}>>= 1000px</Status>
      <Status matches={medium}>>= 1100px</Status>
      <Status matches={obj.small}>>= 1000px</Status>
      <Status matches={obj.medium}>>= 1100px</Status>
    </div>
  )
}
