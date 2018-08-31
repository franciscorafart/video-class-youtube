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
            default: message = ''
        }

        return(
            <div>{message}</div>
        )
    }
}

export default UserMessage
