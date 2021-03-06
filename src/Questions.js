import React, {Component} from 'react';
import LiElement from './LiElement'
import config from './configs/m_choice_config.json';
import './App.css';

class Questions extends Component {
    constructor(props){
        super(props)

        this.handleAnswer = this.handleAnswer.bind(this)

        this.currentQuestion = {}
    }

    componentWillMount(){
        this.currentQuestion = config.questions[this.props.questionNum]
    }

    handleAnswer(e){
        if (e === this.currentQuestion.correct){
            this.props.handleCorrect(true)
        } else {
            this.props.handleCorrect(false)
        }
    }

    render(){
        return(
            <div className="questionBox clearfix">
                <h2 className="question centered">Question {this.props.questionNum+1}: {this.currentQuestion.question}</h2>
                <ul className="ulBox">
                    {
                        this.currentQuestion.alternatives.map((alt) =>

                            <LiElement
                                identifier={alt.id}
                                text={alt.text}
                                handleAnswer={this.handleAnswer}
                            />
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default Questions
