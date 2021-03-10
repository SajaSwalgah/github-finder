import React, { useState, useContext } from 'react'
import { GithubContext } from '../../context/github/githubContext.js'
import { AlertContext } from '../../context/alert/AlertContext.js'

const Search = (props) => {
    const githubContext = useContext(GithubContext)
    const alertContext = useContext(AlertContext);
    const [text, setText] = useState('')
    const changeHandler = (event) => {
        setText(event.target.value)
    }

    const submit = (e) => {
        e.preventDefault();
        if (text === '') {
            alertContext.setAlert('Please enter search query', 'warning')
        } else {
            githubContext.searchUser(text)
            setText('')
        }
    }
    return (
        <div>
            <form className="form" onSubmit={submit}>
                <input type="text" name="text" placeholder="Search Users..." value={text} onChange={changeHandler} />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
                {githubContext.users.length > 0 && <button className="btn btn-light btn-block" onClick={githubContext.clearSearch} >Clear</button>
                }
            </form>
        </div>
    )

}

export default Search
