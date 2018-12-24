import React, { Component } from 'react';
import logo from './logo.svg';
import './index.css';
import ReactDOM from 'react-dom';
import { WebcamCapture } from './Components/WebcamCapture.js';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"  style={{width: 300, position: "absolute", top: 0}}/>
          <WebcamCapture/>
          <p style={{position: "absolute", top: 750}}>
            Click button to generate playlist.
          </p>
        </header>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
