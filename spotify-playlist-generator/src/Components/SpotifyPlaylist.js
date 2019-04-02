import React, { Component } from 'react';
import queryString from 'query-string';

export class SpotifyPlaylist extends Component{
  constructor(props){
    super(props);
    this.state = {
      serverData: 'Default',
      processed_results: this.props.processed_results
    };
  }

//  componentDidMount() {
  //  let parsed = queryString.parse(window.location.search);
    //let accessToken = parsed.access_token;
    //console.log(accessToken);
//
  //  fetch('https://api.spotify.com/v1/me', {
    //  headers:  {'Authorization': 'Bearer ' + accessToken}
    //}).then(res => res.json())
    //.then(data => this.setState({serverData: JSON.stringify(data.display_name)}));
//}

  render(){
    return(
      <div>
        <p> {this.state.serverData} </p>
      </div>
    )
  }
}
