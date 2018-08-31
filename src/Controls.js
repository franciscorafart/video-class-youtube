import React, {Component} from 'react';

class Controls extends Component {
    constructor(props){
        super(props)
        // this.state = {
        //     correct: false
        // }

    }
    render(){
        return(
            <div>
                <button onClick={this.props.startVideoFrom}>Press to {this.props.text}</button>
            </div>
        )
    }
}

export default Controls
