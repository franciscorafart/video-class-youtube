import React, { Component } from 'react';

class LiElement extends Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }
    componentDidMount(){
        console.log(this.props.identifier)
        console.log(this.props.text)
    }

    handleClick(e){
        console.log(this.props.identifier)
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
