import React, { Component } from 'react';
import Body from './Body'
import Footer from './Footer'
import Header from './Header'
import './css/reset.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
          <Header/>
          <Body className="container clearfix"/>
          <Footer/>
      </div>
    );
  }
}

export default App;
