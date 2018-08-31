import React, { Component } from 'react';
import Questions from './Questions'
import Controls from './Controls'
import config from './configs/m_choice_config.json'
import './App.css';

class VideoPlayer extends Component {

    constructor(props){
        super(props)
        this.player = null
        this.timedListener = null
        this.correct_answer = false

        const script = document.createElement("script");
        script.src = config.srcapi;
        script.async = true;
        document.body.appendChild(script);

        this.state = {
            done: false,
            question: 0,
            display_question: false,
            display_control: false
        }
        //Bind here
        this.onPlayerReady = this.onPlayerReady.bind(this)
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this)
        this.stopVideo = this.stopVideo.bind(this)
        this.pauseVideo = this.pauseVideo.bind(this)
        this.checkTime = this.checkTime.bind(this)
        this.startVideoFrom = this.startVideoFrom.bind(this)
        this.handleCorrect = this.handleCorrect.bind(this)
    }

    componentDidMount () {

        window['onYouTubeIframeAPIReady'] = (e) => {
            this.YT = window['YT'];
            this.reframed = false;
            this.player = new window['YT'].Player('player', {
                height: "360",
                width: "640",
                videoId: config.videoId,
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange
                }
            })
        }

        // this.timedListener = setInterval(this.checkTime, 1000)
    }

    onPlayerStateChange(e){
        if (e.data === window['YT'].PlayerState.PLAYING && !this.state.done){
            // setTimeout(this.stopVideo, 6000)
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
            clearInterval(this.timedListener)
            this.setState({display_question: true})
        }


        //2. If so, pause video and display component
    }

    handleCorrect(correct){
        this.correct_answer = correct

        this.setState({
            display_question: false,
            display_control: true
        })
    }

    startVideoFrom(){
        //extract correct and incorrect time
        let sec = null
        let nextQuestion = this.state.question

        if (this.correct_answer){
            sec = config.questions[this.state.question].correct_sec
            nextQuestion+=1
        }
        else
            sec = config.questions[this.state.question].incorrect_sec

        if (nextQuestion >= config.questions.length){
            this.stopVideo()
            this.setState({done: true})
        } else{
            this.player.seekTo(sec, true)
            this.player.playVideo()
            this.timedListener = setInterval(this.checkTime, 1000)

            this.setState({
                question: nextQuestion,
                display_control: false
            })
            //reset correct answer
            this.correct_answer = false
        }
    }

    onPlayerReady(e){
        e.target.seekTo(0, true)
        e.target.playVideo()
        this.timedListener = setInterval(this.checkTime, 1000)
    }

  render() {
      let controlsText = ''
      this.correct_answer? controlsText = "continue with video":controlsText="re-watch previous section"

      let questions = <Questions questionNum={this.state.question} handleCorrect={this.handleCorrect}></Questions>
      let congrats = <div>Congratulations!!</div>
      let controls = <Controls startVideoFrom={this.startVideoFrom} text={controlsText}/>
    return (
      <div>
          <div id="player"></div>
          {
              this.state.display_question === true?
              questions:null
          }
          {
              this.state.display_control === true? controls: null
          }
          {
              this.state.done===true? congrats:null
          }

      </div>
    );
  }
}

export default VideoPlayer;
