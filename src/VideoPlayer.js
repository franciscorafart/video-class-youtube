import React, { Component } from 'react';
import config from './configs/m_choice_config.json'
import './App.css';

class VideoPlayer extends Component {

    constructor(props){
        super(props)
        this.player = null

        const script = document.createElement("script");
        script.src = config.srcapi;
        script.async = true;
        document.body.appendChild(script);

        this.state = {
            done: false
        }
        //Bind here
        this.onPlayerReady = this.onPlayerReady.bind(this)
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
        this.stopVideo = this.stopVideo.bind(this)
        this.pauseVideo = this.pauseVideo.bind(this)
    }

    componentDidMount () {
        window['onYouTubeIframeAPIReady'] = (e) => {
            this.YT = window['YT'];
            this.reframed = false;
            this.player = new window['YT'].Player('player', {
                height: config.height,
                width: config.weight,
                videoId: config.videoId,
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange
                }
            })
        }
    }


    onPlayerReady(e){
        e.target.playVideo();
    }

    onPlayerStateChange(e){
        if (e.data === window['YT'].PlayerState.PLAYING && !this.state.done){
            setTimeout(this.stopVideo, 6000)
            this.setState({done: true})
        }
    }

    stopVideo(){
        this.player.stopVideo();
    }

    pauseVideo(){
        this.player.pauseVideo();
    }

  render() {
    return (
      <div>
          <div id="player"></div>
      </div>
    );
  }
}

export default VideoPlayer;
