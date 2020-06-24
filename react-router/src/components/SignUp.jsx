import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [redirect, setRedirect] = useState(false);

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const regis = () => {
    const newMember = {
      username: username,
      email: email,
      password: password,
    };
    axios
      .post(`http://localhost:4000/signup`, newMember)
      .then((result) => {
        console.log(result);
        setUsername("");
        setEmail("");
        setPassword("");
        setAlert(result.data.message);
        setTimeout(() => {
          setAlert("");
        }, 3000);
        setRedirect(true);
      })
      .catch((err) => {
        setAlert(err.message);
      });
  };

  return (
    <Fragment>
      {redirect && <Redirect to="/signin" />}

      <div>
        <div className="container">
          <div className="container-regis">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card p-4">
                  <div className="card-body">
                    {alert && (
                      <div className="alert alert-primary" role="alert">
                        <p>{alert}</p>
                      </div>
                    )}
                    <h2>Sign up Page</h2>
                  </div>

                  <div className="form-gorup">
                    <label> Username :</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username-registration"
                      placeholder="Username"
                      value={username}
                      onChange={onChangeUsername}
                    />
                  </div>

                  <div className="form-gorup">
                    <label> Email :</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email-registration"
                      placeholder="example@email.com"
                      value={email}
                      onChange={onChangeEmail}
                    />
                  </div>

                  <div className="form-gorup">
                    <label> Password :</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password-registration"
                      placeholder="password"
                      value={password}
                      onChange={onChangePassword}
                    />
                  </div>

                  <button className="btn btn-primary" onClick={regis}>
                    Sign Up
                  </button>
                  <Link to="/signin">Already have an account ? sign in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignUp;
