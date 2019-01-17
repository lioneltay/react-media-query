import React from "react"
import styled from "styled-components"

import { Title, NavItem } from "./components"

const Container = styled.div``

const ExamplesNavigation: React.FunctionComponent = () => {
  return (
    <Container>
      <Title>Examples</Title>

      <NavItem to="/examples/dev">Dev</NavItem>
    </Container>
  )
}

export default ExamplesNavigation
