import React, { useState } from 'react';
import authenticate from './lib/authentication';

function Login({ loginSuccess }){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const logOut = () => {
        localStorage.setItem('tkn', '')
        window.location.reload()
    }

    if(localStorage.getItem('tkn') !== ""){
        return(<button onClick={logOut}>Log Out</button>)
    }

    const handleSubmit = event => {
        event.preventDefault();
        authenticate(username, password, response => {loginSuccess(response); console.log("response:" + response)})
        event.target.reset();
      }

    return(
        <form onSubmit={handleSubmit}>
          <label>
            Username: <input type="text" name="username" onChange={ e => setUsername(e.target.value) }/>
          </label>
          <label>
            Password: <input type="password" name="password" onChange={ e => setPassword(e.target.value) }/>
          </label>
          <button type="submit">Login</button>
        </form>
    );
}

export default Login;