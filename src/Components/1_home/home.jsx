import React from 'react'
import './home.less';

export default class HomeContent extends React.Component{


      render() {
        return <div id="home-container">
          <div className="home-bg">
            <img alt="home-bg" src={require("../../images/home_bg.jpg")} />
          </div>  
        </div>
      }
}

