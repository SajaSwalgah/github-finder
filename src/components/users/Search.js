import React, { Component } from 'react'

export class Search extends Component {
    state = {
        text: '',
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submit = (e) => {
        e.preventDefault();
        if (this.state.text === '') {
            this.props.alert('Please enter search query', 'warning')
        } else {
            
            this.props.searchUser(this.state.text)
            this.setState({ text: '' })
        }

    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.submit}>
                    <input type="text" name="text" placeholder="Search Users..." value={this.state.text} onChange={this.changeHandler} />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                    {this.props.showClear && <button className="btn btn-light btn-block" onClick={this.props.clearSearch} >Clear</button>
                    }
                </form>

            </div>
        )
    }
}

export default Search
