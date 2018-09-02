import React, { Component } from 'react';
import Questions from './Questions'
import Controls from './Controls'
import UserMessage from './UserMessage'
import config from './configs/m_choice_config.json'
import './App.css';

class VideoPlayer extends Component {

    constructor(props){
        super(props)
        this.player = null
        this.timedListener = null
        this.correct_answer = false
        this.controlsText = 'start video'

        const script = document.createElement("script");
        script.src = config.srcapi;
        script.async = true;
        document.body.appendChild(script);

        this.state = {
            done: false,
            question: 0,
            display_question: false,
            display_control: true,
            initial:true
        }

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
                height: "281",
                width: "500",
                playerVars: {autoplay: 0, 'controls': 0 },
                videoId: config.videoId,
                host: config.host,
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange
                }
            })
        }

    }

    onPlayerStateChange(e){
        if (e.data === window['YT'].PlayerState.PLAYING && !this.state.done){
            console.log('Video playing!')
        }
    }

    stopVideo(){
        this.player.stopVideo();
    }

    pauseVideo(){
        this.player.pauseVideo();
    }

    checkTime(){
        let upperBound = config.questions[this.state.question].correct_sec
        let current = this.player.getCurrentTime()

        if(current >= upperBound){
            this.pauseVideo()
            clearInterval(this.timedListener)
            this.setState({display_question: true})
        }
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
        console.log('sec', sec, 'nextQuestion',nextQuestion)
        if (nextQuestion >= config.questions.length){
            this.stopVideo()
            this.setState({done: true})
        } else{
            this.player.seekTo(sec, true)
            this.player.playVideo()
            this.timedListener = setInterval(this.checkTime, 1000)

            this.setState({
                question: nextQuestion,
                display_control: false,
                initial: false
            })
            //reset correct answer
            this.correct_answer = false
        }
    }

    onPlayerReady(e){
        e.target.seekTo(0, true)
        this.pauseVideo()
        // e.target.playVideo()
        // this.timedListener = setInterval(this.checkTime, 1000)
    }

  render() {
      let mess;
      if(this.correct_answer){
          this.controlsText = "continue with video";
          this.state.done? mess='d': mess='c'
      } else {
          this.controlsText="re-watch previous section"
          this.state.initial? mess='in': mess='i'
      }

      let questions = <Questions questionNum={this.state.question} handleCorrect={this.handleCorrect}></Questions>
      let congrats = <UserMessage mess={mess}/>
      let controls = <Controls startVideoFrom={this.startVideoFrom} text={this.controlsText} initial={this.state.initial}/>
      let noQuestions = <div><h3 className="centered">Video playing...</h3></div>
    return (
      <div className="videoComponent clearfix">
          <div className="section1 clearfix">
              {
                  this.state.display_question === true?
                    questions:
                    this.state.display_control === true?
                        null:
                        noQuestions
              }
              {
                  this.state.display_control === true? congrats:null
              }
              {
                  this.state.display_control === true? controls: null
              }
          </div>
          <div className="section2 clearfix centered">
              <div id="player"></div>
          </div>
      </div>
    );
  }
}

export default VideoPlayer;
