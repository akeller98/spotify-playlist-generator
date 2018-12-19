import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import  Webcam  from 'react-webcam'

export class WebcamCapture extends Component{
  setRef = webcam => {
    this.webcam = webcam;
  };
  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    fetch('/process')
      .then((res) => {return res})
      .then((data) => {console.log(data)});
  };
  render(){
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
    return(
      <div style={{position:"relative", left:0, top: 20}}>
        <Webcam
          audio = {false}
          height={480}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={640}
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture} style={{position:"relative", left:-380}}>Capture photo</button>
      </div>
    );
  }
}

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

//ReactDOM.render(<App />, document.getElementById('root'));
