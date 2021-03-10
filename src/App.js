import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from "./components/layout/Navbar.js";
import Alert from './components/layout/Alert.js';
import SingleUser from './components/users/SingleUser.js'
import GithubState from './context/github/GithubState.js'
import AlertState from './context/alert/AlertState.js'
import About from './components/pages/About.js'
import Home from './components/pages/Home.js'
import NotFound from './components/pages/NotFound.js'

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <BrowserRouter>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/about' component={About} />
                <Route path='/user/:login' component={SingleUser} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </AlertState>
    </GithubState>
  )

}
export default App