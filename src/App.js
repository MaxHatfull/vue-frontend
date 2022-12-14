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
    const request = new Request(token);
    request.getDevices()
    .then(devices => {
      const channels = devices.devices[0].devices[0].channels.filter(channel => channel.name !== null)
      setChannelNames(channels.map(c => c.name))
      return {
      gid: devices.devices[0].deviceGid,
      channels: channels.map(c => c.channelNum)
    }})
    .then(deviceData => deviceData.channels.map(c => request.getChartUsage(deviceData.gid, c)))
    .then(requests => Promise.all(requests))
    .then(data => setData(data));
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="title">
          <h1>Energy Usage</h1>
          <h2>At Max's house</h2>
        </div>
        <Login loginSuccess={loginSuccess}/>
      </header>
      <div id="content">
        {token !== "" ? <Chart chartData={data} channelNames={channelNames}/> : <></>}
      </div>
    </div>
  );
}

export default App;
