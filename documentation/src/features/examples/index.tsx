import React from "react"
import styled from "styled-components"
import { Route, Switch, Redirect } from "react-router-dom"

import DevDemo from "./Dev"

const Container = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
`

const ExamplePage: React.FunctionComponent = () => {
  return (
    <Container>
      <Switch>
        <Route path="/examples/dev" component={DevDemo} />
        <Route render={() => <Redirect to="/examples/dev" />} />
      </Switch>
    </Container>
  )
}

export default ExamplePage
