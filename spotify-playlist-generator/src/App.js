import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import  Webcam  from 'react-webcam'

export class WebcamCapture extends Component{
  constructor(props){
    super(props);
    this.state = {
      processed_results : 'test'
    };
    this.capture = this.capture.bind(this);
    this.setRef = this.setRef.bind(this);
    //this.setVal = this.set.bind(this);
  }
  setRef = webcam => {
    this.webcam = webcam;
  };

  capture () {
    const imageSrc = this.webcam.getScreenshot();
    let data = {
      "image": imageSrc
    }
    let results = '';
    fetch('/process', {
      method: "POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function(response){
      return response.body;
    })

    setTimeout(function(){
    fetch('/process')
      .then(res => res.json())
      .then(data => results = JSON.stringify(data))
    }, 2000);

    setTimeout(
      () => this.setState({processed_results: results})
    , 3000);
    //this.forceUpdate();
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
        <p> {this.state.processed_results} </p>
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
