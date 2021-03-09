import React, { Component } from 'react'
import UserItem from './UserItem.js'
import Spinner from '../layout/Spinner.js'

export default class Users extends Component {
    state = {

    }

    render() {
        return (
            <div style={userStyle}>
                {this.props.loading ? <Spinner /> : this.props.users.map(user => (
                    <UserItem key={user.id} user={user} />
                ))}

            </div>
        )
    }
}


const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '1rem'
}