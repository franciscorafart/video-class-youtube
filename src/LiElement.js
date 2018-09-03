import React, { Component } from 'react';
import './LiElement.css'

class LiElement extends Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e){
        this.props.handleAnswer(this.props.identifier)
    }

    render(){
        return (
            <div className="liComponent clear">
                <li>
                    <span className="span">{this.props.text}</span>
                    <button className="button" onClick={this.handleClick}>Select</button>
                </li>
            </div>
        )
    }
}

export default LiElement;
