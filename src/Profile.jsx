import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {

    }

  }
  render(){
    let artist = {name: '' , followers: {total: ''} , images: [{url: ''}] , genres: []};
    artist = this.props.artist !== null ? this.props.artist : artist;
    return (
      <div className = "profile">
        <img
          alt = "profile"
          className = "profile-img"
          src = {artist.images[0].url}
        />
        <div className = "profile-info">
          <div className = "profile-name"> {artist.name} </div>
          <div className = "profile-followers"> {artist.followers.total} followers</div>
          <div className = "profile-genres">
            {
              artist.genres.map((genr , k) => {
                genr = genr !== artist.genres[artist.genres.length - 1] ? `${genr},`:` ${genr}`;
                return (
                  <span key = {k}>{genr}</span>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
