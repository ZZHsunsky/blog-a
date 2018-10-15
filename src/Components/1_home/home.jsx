import React from 'react'
import './home.less';

export default class HomeContent extends React.Component{

  state = {
    isload:false,
    transformPoster : 'translate3d(0,0,0)'
  }
  
  componentDidMount() {
    this.w = document.body.clientWidth || window.clientWidth;
    this.h = document.body.clientHeight || window.clientHeight;
  }
  handleMouseOver = (e) => {
    var offsetX = 0.5 - e.pageX / this.w, //cursor position X
        offsetY = 0.5 - e.pageY / this.h, //cursor position Y
        dy = e.pageY - this.h / 2, //@h/2 = center of poster
        dx = e.pageX - this.w / 2, //@w/2 = center of poster
        theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
        angle = theta * 180 / Math.PI - 90, //convert rad in degrees
        offsetPoster = 20,
        transformPoster = 'translate3d(' + offsetX * offsetPoster + 'px,' + offsetY * offsetPoster + 'px,20px)'

        //get angle between 0-360
        if (angle < 0) {
          angle = angle + 360;
        }

        this.setState({transformPoster:transformPoster});
  }

  render() {
    return <div id="home-container">
      <header className="banner" onMouseMove={this.handleMouseOver} >
        <span className="background"></span>       
        <h1 style={{transform:this.state.transformPoster}}>  hahaha   </h1>
      </header>
      <div>
        <div className='home-log-container'>
          <div className='log-img' style={{backgroundImage:"url(" + require("../../images/home/log-container-1.jpeg") + ")"}}>
          </div>
          <div className='log-content'>
            <h2><span>我</span><span>是</span><span>标</span><span>题</span></h2><br></br>
            <div>2018-03-25</div>
            <p>《还珠3》刚播出的时候，我并不喜欢。 那时候我觉得黄奕没有赵薇眼睛大，没有赵薇活泼可爱。马伊俐又没...</p>
          </div>
        </div>
        <div className='home-log-container'>
          <div className='log-img' style={{backgroundImage:"url(" + require("../../images/home/log-container-2.jpeg") + ")"}}>
          </div>
          <div className='log-content'>
            <h2>log-title</h2><br></br>
            <div>2018-03-25</div>
            <p>《还珠3》刚播出的时候，我并不喜欢。 那时候我觉得黄奕没有赵薇眼睛大，没有赵薇活泼可爱。马伊俐又没...</p>
          </div>
        </div>
      </div>
    </div>
  }
}

