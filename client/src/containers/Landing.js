import React, { Component } from 'react';
import { Button, Divider, Header, Message } from "semantic-ui-react";

// import logo from './logo.svg';


const axios = require('axios');

// const ROOT_URL = 'http://localhost:3001';

// function apiTestGet() {
//   return axios.get(`${ROOT_URL}/api/test`);
// }

class Landing extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
           <Header> Welcome to the landing page</Header>

          </p>
          <Button content='Primary' primary />
          {/* <button onClick={apiTestGet}>API Test</button> */}
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
}

export default Landing;
