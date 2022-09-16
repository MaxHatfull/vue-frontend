import './App.css';
import React, { useState, useEffect } from 'react';
import Request from './lib/request';
import Login from './Login.js';
import { Chart } from './Chart';

function App() {
  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    if(localStorage.getItem('tkn') !== ""){
      loginSuccess(localStorage.getItem('tkn'))
    }
  }, []);

  useEffect(() => {
    console.log("data has updated")
  }, [data]);

  const makeRequest = event => {
    const request = new Request(token);
    request.getDevices()
    .then(devices => devices.devices[0].deviceGid)
    .then(deviceGid => request.getChartUsage(deviceGid))
    .then(data => setData(data));
  }

  const loginSuccess = (token) => {
    setToken(token)
    console.log(token)
    const request = new Request(token);
    request.getDevices()
    .then(devices => devices.devices[0].deviceGid)
    .then(deviceGid => request.getChartUsage(deviceGid))
    .then(data => setData(data));
  }
  
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Login loginSuccess={loginSuccess}/>
      <Chart chartData={data} />
    </div>
  );
}

export default App;
