import React, {Component} from 'react';

class Controls extends Component {
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        if(this.props.initial===true)
            this.props.startVideoFrom()
    }

    render(){
        let thisText;
        this.props.initial === true? thisText=' start course': thisText=this.props.text;

        return(
            <div>
                <button onClick={this.props.startVideoFrom} className="button mainButton"><span>Press to {thisText}</span></button>
            </div>
        )
    }
}

export default Controls
