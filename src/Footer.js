import React, {Component} from 'react'
import './Footer.css'

class Footer extends Component{
  render(){
    return(
      <footer className="footer clearfix">
        <span className="span">Contact Us</span>
        <span className="clear span">Music online courses</span>
        <span className="clear span"><a href="https://github.com/franciscorafart/">github.com/franciscorafart</a></span>
      </footer>
    )
  }
}

export default Footer;
