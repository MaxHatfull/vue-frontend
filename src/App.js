import './App.css';
import React, { useState, useEffect } from 'react';
import Request from './lib/request';
import Login from './Login.js';
import { Chart } from './Chart';

function App() {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);
  const [channelNames, setChannelNames] = useState([])

  useEffect(() => {
    if(localStorage.getItem('tkn') !== ""){
      loginSuccess(localStorage.getItem('tkn'))
    }
  }, []);

  useEffect(() => {
    console.log("data has updated")
  }, [data]);

  const loginSuccess = (token) => {
    setToken(token)
    console.log(token)
    const request = new Request(token);
    request.getDevices()
    .then(devices => {
      console.log(devices)
      setChannelNames(devices.devices[0].devices[0].channels.map(c => c.name))
      return {
      gid: devices.devices[0].deviceGid,
      channels: devices.devices[0].devices[0].channels.map(c => c.channelNum)
    }})
    .then(deviceData => deviceData.channels.map(c => request.getChartUsage(deviceData.gid, c)))
    .then(requests => Promise.all(requests))
    .then(data => setData(data));
  }

  return (
    <div className="App">
      <header className="App-header">
        <Login loginSuccess={loginSuccess}/>
        <div className="title">
          <h1>Energy Usage</h1>
          <h2>At Max's house</h2>
        </div>
        <form className="login" onSubmit={handleSubmit}>
          <label>
            <input placeholder="username" type="text" name="username" onChange={ e => setUsername(e.target.value) }/>
          </label>
          <label>
            <input placeholder="password" type="password" name="password" onChange={ e => setPassword(e.target.value) }/>
          </label>
          <button type="submit">Login</button>
        </form>
      </header>
      <div id="content">
        <Chart chartData={data} channelNames={channelNames}/>
      </div>
    </div>
  );
}

export default App;
