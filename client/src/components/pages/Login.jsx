import React, { useState } from 'react'
import api from '../../api'
import { useForm } from '../../hooks'

export default function Login(props) {
  const { handleChange, formValues } = useForm()

  const [message, setMessage] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    api
      .login(formValues.email, formValues.password)
      .then(result => {
        console.log('SUCCESS!')
        props.history.push('/') // Redirect to the home page
      })
      .catch(err => setMessage(err.toString()))
  }

  return (
    <div className="Login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        Email:{' '}
        <input
          type="text"
          value={formValues.email || ''}
          name="email"
          onChange={handleChange}
        />{' '}
        <br />
        Password:{' '}
        <input
          type="password"
          value={formValues.password || ''}
          name="password"
          onChange={handleChange}
        />{' '}
        <br />
        <button>Login</button>
      </form>
      {message && <div className="info info-danger">{message}</div>}
    </div>
  )
}
