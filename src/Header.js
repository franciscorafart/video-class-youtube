import React, { Component } from 'react';

//This is a component. Reusable pieces of UI
class Header extends Component {
  render() {
    return (
      <header className="header centerd">
        <h1 className="centered">Online Music Lessons App</h1>
      </header>
    )
  }
}

export default Header;
