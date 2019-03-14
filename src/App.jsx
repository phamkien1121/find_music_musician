import React, {Component} from 'react';
import './App.css';
import queryString from 'query-string';
import { FormGroup, FormControl , InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile.jsx';
import Gallery from './Gallery.jsx';

class App extends Component {
  constructor(props){
    super(props);
      this.state = {
        query: '',
        artist: null,
        tracks: []
      }
  }
  Search(){
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        let artist = null;
        artist = json.artists.items[0];
        if(!artist){
          alert('Ops!! Somthing Wrong !!! Please try again');
          artist = null;
        }
        this.setState({ artist });
      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
      fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
          const {tracks} = json;
          this.setState({tracks});
        })
      })
      .catch(error => {
      })
  }
  render(){
    return (
      <div className = 'App'>
        <div className = 'App-title'>Musican Master!</div>
        <FormGroup>
          <InputGroup>
            <FormControl
              type = "text"
              placeholder ="Search for an Artist"
              value = {this.state.query}
              onChange = {event => {this.setState ({query: event.target.value})}}
              onKeyPress = {event => {
                if(event.key === 'Enter')
                  this.Search();
              }}
            />
            <InputGroup.Addon>
              <Glyphicon glyph = "search"></Glyphicon>
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist !== null ?
          <div>
            <Profile
              artist = {this.state.artist}
            />
            <Gallery tracks = {this.state.tracks}/>
          </div>
          : <div></div>
        }
      </div>

    )
  }
}
export default App;
