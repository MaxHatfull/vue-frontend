import logo from './logo.svg';
import './App.css';
import React, { useReducer, useState } from 'react';

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');

function authenticate(username, password) {
  var authenticationData = {
    Username: username,
    Password: password,
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
  );
  var poolData = {
    UserPoolId: 'us-east-2_ghlOXVLi1', // Your user pool id here
    ClientId: '4qte47jbstod8apnfic0bunmrq', // Your client id here
  };
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var userData = {
    Username: username,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function(result) {
      var accessToken = result.getAccessToken().getJwtToken();
      console.log(accessToken)
    },
    onFailure: function(err) {
      alert(err.message || JSON.stringify(err));
    },
  });
}


function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    authenticate(username, password);
    event.target.reset();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <label>
            Username: <input type="text" name="username" onChange={ e => setUsername(e.target.value) }/>
          </label>
          <label>
            Password: <input type="password" name="password" onChange={ e => setPassword(e.target.value) }/>
          </label>
          <button type="submit">Login</button>
        </form>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
