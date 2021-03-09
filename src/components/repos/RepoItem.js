import React from 'react'

const RepoItem = ({ repo }) => {
    console.log('ddddsss');
    return (
        <div className='card'>
            
            <a href={repo.html_url}>{repo.name}</a>

        </div>
    )
}

export default RepoItem
