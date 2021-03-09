import React from 'react'
import RepoItem from './RepoItem.js'

const Repos = ({ repos }) => {
    console.log('dddd');
    return repos.map(repo => <RepoItem repo={repo} key={repo.id} />
    )
}
export default Repos


