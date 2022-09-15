import './App.css';
import React, { useState } from 'react';
import authenticate from './lib/authentication';
import Request from './lib/request';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    authenticate(username, password, response => {setToken(response); console.log("response:" + response)})
    event.target.reset();
  }

  const makeRequest = event => {
    const request = new Request(token);
    request.getDevices()
    .then(devices => devices.devices[0].deviceGid)
    .then(deviceGid => request.getChartUsage(deviceGid));
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label>
            Username: <input type="text" name="username" onChange={ e => setUsername(e.target.value) }/>
          </label>
          <label>
            Password: <input type="password" name="password" onChange={ e => setPassword(e.target.value) }/>
          </label>
          <button type="submit">Login</button>
        </form>
      </header>
      <button onClick={makeRequest}>Do Stuff</button>
    </div>
  );
}

export default App;
