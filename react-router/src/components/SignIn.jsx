import React, {useState, Fragment} from 'react'
import { Link, Redirect } from 'react-router-dom'

import axios from 'axios'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const onChangeEmail = (e) => {
    const value = e.target.value
    setEmail(value)
  }

  const onChangePassword = (e) => {
    const value = e.target.value
    setPassword(value)
  }

  const login = () => {
    const newLogin = {
      email : email,
      password : password
    }

    axios.post(`http://localhost:3000/signin`, newLogin)
      .then(result => {
        console.log("ini dia", result.data.id)
        const userData = result.data.id
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('userId', userData)
        setRedirect(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Fragment>
      {
        redirect && (
          <Redirect to='product' />
        )
      }
      <div>
        <div className="container">
          <div className="container-login">
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card p-4">
                    <div className="card-body">
                      <h2>Sign in Page</h2>
                    </div>
                    <div className="form-gorup">
                    <label> Email :</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email-registration" 
                        placeholder="example@email.com" 
                        value = {email}
                        onChange = {onChangeEmail} />
                    </div>
                    
                    <div className="form-gorup">
                    <label> Password :</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password-registration" 
                        placeholder="password"
                        value = {password}
                        onChange = {onChangePassword} />
                    </div>

                    <button className="btn btn-primary" onClick={login}>Sign In</button>
                    <Link to='/signup'>
                      Don't have an account ?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </Fragment>
  )
}

export default SignIn