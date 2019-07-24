import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainNavbar from './MainNavbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import List from './pages/List'
import { Container } from 'reactstrap'

export default function App() {
  return (
    <div className="App">
      <MainNavbar />
      <Container>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/list" component={List} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </Container>
    </div>
  )
}
