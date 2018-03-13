import React from 'react'
import {connect} from 'react-redux'

import {registerUser, registerError} from '../actions/register'
import ErrorMessage from './ErrorMessage'

class RegisterForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirm: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  handleClick (event) {
    const {username, password, confirm} = this.state
    if (password !== confirm) {
      this.props.registerError('Passwords do not match!')
      return
    }
    const creds = {
      username: username.trim(),
      password: password.trim()
    }
    this.props.registerUser(creds)
      .then(() => this.props.history.push('/home'))
  }

  render () {
    const {username, password, confirm} = this.state
    return (
      <div className="container">
        <div className="wrapper">
          <div name="Login_Form" className="form-signin">
            <input className="form-control" name='username' placeholder='Username'
              onChange={this.handleChange} value={username} />

            <input className="form-control" type='password' name='password' placeholder='Password'
              onChange={this.handleChange} value={password} />

            <input type='password' name='confirm' placeholder='Confirm'
              onChange={this.handleChange} value={confirm} />

            <button className="btn btn-lg btn-primary btn-block" onClick={this.handleClick}>Register</button>

            <ErrorMessage reducer='auth' />
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (creds) => {
      return dispatch(registerUser(creds))
    },
    registerError: (message) => {
      dispatch(registerError(message))
    }
  }
}

export default connect(null, mapDispatchToProps)(RegisterForm)
