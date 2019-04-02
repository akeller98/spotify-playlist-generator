import React, { Component } from 'react';
import  Webcam  from 'react-webcam';
import { SpotifyPlaylist } from './SpotifyPlaylist.js'
import queryString from 'query-string';

export class WebcamCapture extends Component{
  constructor(props){
    super(props);
    this.state = {
      processed_results : '',
      serverData: ''
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
    setTimeout(
      () => {
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        console.log(accessToken);

        fetch('https://api.spotify.com/v1/me', {
          headers:  {'Authorization': 'Bearer ' + accessToken}
        }).then(res => res.json())
        .then(data => this.setState({serverData: JSON.stringify(data.display_name)}));
      }, 3400);
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

        <p> {this.state.serverData} </p>
      </div>
    );
  }
}
