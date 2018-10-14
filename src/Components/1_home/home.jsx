import React from 'react'
import './home.less';

export default class HomeContent extends React.Component{

  state = {
    isload:false,
  }

  componentDidMount(){
    this.setState({isload:true});
  }
      render() {
        return <div id="home-container">
          <header className="banner">
            <span className="background"></span>         
            <h1><span className="background"></span>
            hahaha
            </h1>
          </header>
        </div>
      }
}

