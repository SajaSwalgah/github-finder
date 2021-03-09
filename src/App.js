import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css';
import Navbar from "./components/layout/Navbar.js";
import Users from './components/users/Users.js'
import Search from "./components/users/Search.js";
import Alert from './components/layout/Alert.js';
import About from './components/pages/About.js'
import SingleUser from './components/users/SingleUser.js'

export default class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: []
  }

  searchUser = async (user) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${user}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`)
    this.setState({ loading: false, users: res.data.items })

  }

  getUser = async (user) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${user}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`)
    this.setState({ user: res.data, loading: false })

  }

  getUserRepos = async user => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${user}/repos?per_page=5&sort=created:asc&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`)
    this.setState({ repos: res.data, loading: false })

  }

  clearSearch = async () => {
    this.setState({ loading: false, users: [] })
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } })
    setTimeout(() => {
      this.setState({ alert: null })
    }, 3000);
  }
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' component={() => {
                return (
                  <React.Fragment>
                    <Search searchUser={this.searchUser} clearSearch={this.clearSearch} showClear={this.state.users.length ? true : false} alert={this.setAlert} />
                    <Users loading={this.state.loading} users={this.state.users} />
                  </React.Fragment>
                )
              }} />
              <Route path='/about' component={About} />
              <Route path='/user/:login' render={props => {
                return (
                  <SingleUser {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} user={this.state.user} repos={this.state.repos} loading={this.state.loading} />
                )
              }} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
