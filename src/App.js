import React, { Component } from 'react';
import Body from './Body'
import './css/reset.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
          <Body id="container" className="clearfix"></Body>
      </div>
    );
  }
}

export default App;
