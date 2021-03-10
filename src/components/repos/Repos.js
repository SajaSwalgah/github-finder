import React,{useContext} from 'react'
import RepoItem from './RepoItem.js'
import { GithubContext } from '../../context/github/githubContext.js'

const Repos = () => {
    const githubContext = useContext(GithubContext)
    return githubContext.repos.map(repo => <RepoItem repo={repo} key={repo.id} />
    )
}
export default Repos


