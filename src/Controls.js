import React, {Component} from 'react';

class Controls extends Component {
    constructor(props){
        super(props)
    }

    handleClick(){
        if(this.props.initial===true)
            this.props.startVideoFrom
    }

    render(){
        let thisText;
        this.props.initial === true? thisText=' to start course': thisText=this.props.text;

        return(
            <div>
                <button onClick={this.props.startVideoFrom}>Press to {thisText}</button>
            </div>
        )
    }
}

export default Controls
