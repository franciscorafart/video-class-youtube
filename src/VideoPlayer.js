import React, { Component } from 'react';
import config from './configs/m_choice_config.json'
import './App.css';

class VideoPlayer extends Component {

    constructor(props){
        super(props)
        this.player = null
        this.timedListener = null

        const script = document.createElement("script");
        script.src = config.srcapi;
        script.async = true;
        document.body.appendChild(script);

        this.state = {
            done: false,
            question: 0,
            display_question: false
        }
        //Bind here
        this.onPlayerReady = this.onPlayerReady.bind(this)
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
        this.stopVideo = this.stopVideo.bind(this)
        this.pauseVideo = this.pauseVideo.bind(this)
        this.checkTime = this.checkTime.bind(this)
        this.startVideoFrom = this.startVideoFrom.bind(this)
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

        this.timedListener = setInterval(this.checkTime, 1000)
    }

    onPlayerReady(e){
        e.target.playVideo();
    }

    onPlayerStateChange(e){
        if (e.data === window['YT'].PlayerState.PLAYING && !this.state.done){
            // setTimeout(this.stopVideo, 6000)
            // this.setState({done: true})
            console.log('On player state change!')
        }
    }

    stopVideo(){
        this.player.stopVideo();
    }

    pauseVideo(){
        this.player.pauseVideo();
    }

    checkTime(){
        //TODO: 1.evaluate if time elapsed is >= than current answer sec
        let upperBound = config.questions[this.state.question].correct_sec
        let current = this.player.getCurrentTime()
        console.log(current)
        if(current >= upperBound){
            this.pauseVideo()
            this.setState({display_question: true})
        }


        //2. If so, pause video and display component
    }

    startVideoFrom(sec){
        this.player.playVideoAt(sec)
    }

    //NOTE: useful methods
    //player.seekTo(seconds:Number, allowSeekAhead:Boolean)
    //player.playVideoAt(index:Number)

  render() {
      let questions = <div>Questions and Answers</div>

    return (
      <div>
          <div id="player"></div>
          {
              this.state.display_question === true?
                questions:console.log('true')
          }

      </div>
    );
  }
}

export default VideoPlayer;
