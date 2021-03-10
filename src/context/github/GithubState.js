import React, { useReducer } from 'react'
import axios from 'axios'
import { GithubContext } from './githubContext.js'
import GithubReducer from './githubReducer.js'
import {
    SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS
} from '../types.js';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    // search users 
    const searchUser = async (user) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/search/users?q=${user}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`)
        // setUsers(res.data.items)
        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        })
    }

    // git User
    const getUser = async (user) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${user}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`)
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }

    //clear users
    const clearSearch = async () => dispatch({ type: CLEAR_USERS })

    // get repos
    const getUserRepos = async user => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${user}/repos?per_page=5&sort=created:asc&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`)
        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }


    const [state, dispatch] = useReducer(GithubReducer, initialState)
    const setLoading = () => dispatch({ type: SET_LOADING })

    return (
        <GithubContext.Provider value={{ users: state.users, user: state.user, repos: state.repos, loading: state.loading, searchUser, getUser, clearSearch, getUserRepos }}>
            {props.children}
        </GithubContext.Provider>
    )

}

export default GithubState