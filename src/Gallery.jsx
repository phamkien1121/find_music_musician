import React ,{Component} from 'react';
import './App.css';

class Gallery extends Component {
    constructor(props){
      super(props);
      this.state = {
        prULR: '',
        audio: null,
        playing: false
      }
    }
    playAudio(pr){
      let audio = new Audio(pr);
      if(!this.state.prULR || this.state.playing === false){
        audio.play()
        this.setState({
          prULR:pr,
          audio,
          playing: true
        })
      }else if(this.state.prULR === pr){
        this.state.audio.pause();
        this.setState({
          playing: false
        })
      }else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          prULR:pr,
          audio,
          playing: true
        })
      }
    }
    render(){
      const tracks = this.props.tracks;
      console.log('tracksnamea', tracks)
      return(
        <div className = "Gallery-tracks">
          {
            tracks.map((tr , k) => {
              const trackIMG = tr.album.images[0].url;
              console.log('test',tr.preview_url)
              return (
                <div onClick = {()=> this.playAudio(tr.preview_url)} key = {k} className = "track">
                  <img src = {trackIMG} className = "trackimg" alt = "track"/>
                  <div className = 'track-text'>{tr.name  }</div>
                </div>
              )
            })
          }
        </div>
      )
    }
}
 export default Gallery;
