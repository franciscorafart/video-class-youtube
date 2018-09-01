import React, { Component } from 'react';
import './App.css';

class UserMessage extends Component {
    constructor(props){
        super(props)
    }

    render(){
        let message

        switch(this.props.mess){
            case 'c':
                message = 'Answer Correct!'
                break;
            case 'i':
                message = 'Answer Incorrect';
                break;
            case 'd':
                message = "Congratulations! You've completed this unit";
                break;
            case 'in':
                message = "Welcome to the online course!";
                break;
            default: message = ''
        }

        return(
            <div className="userMessage centered">{message}</div>
        )
    }
}

export default UserMessage
