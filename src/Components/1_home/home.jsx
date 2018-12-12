import React from 'react'
import './home.less';
import {AjaxGetRequest, server} from "../service";
import {URLMAPCODE} from "../urlMap";
import Loading from "../loading/Loading";
import { Parallax } from 'rc-scroll-anim';

export default class HomeContent extends React.Component{

  state = {
    ready:false,
    transformPoster : 'translate3d(0,0,0)',
    logs: [],
  }
  
  imgs = [
    require("../../images/home/home-bg.jpg"),
    require("../../images/home/kongming.png"),
    require("../../images/home/wuyan.png"),
    require("../../images/logs/logo-word.svg")
  ];

  imgsLoad = [];

  componentDidMount() {
    const success = res => {
        const data =res.data || [];
        const logs = [];
        for(let _ = 0 ; _ < data.length && _ < 5; _ ++){
          let tempLog = data[_];
          tempLog.content = this.getConent(data[_].content || "");
          logs.push(tempLog);
        }
        this.setState({logs});
    }
    AjaxGetRequest(URLMAPCODE.GET_LOGS, {}, success, () => {});
    this.imgs.map( imgUrl => {
      const image = new Image();
      image.src = imgUrl;
      this.imgsLoad.push(image);
      return null;
    })
    this.imgIsLoad();
  }

  imgIsLoad  = () =>{

    const self = this;
    let count = 0;

    this.imgsLoad.map( img => {
      if(img.width){
        count ++;
      }
      return null;
    })  
    if(count === this.imgs.length && this.state.logs.length > 0 ){
        this.setState({ready: true});
    }else{
      setTimeout(function(){
        self.imgIsLoad();
      }, 2000);
    }
  }

  // handleMouseOver = (e) => {
  //   var offsetX = 0.5 - e.pageX / this.w, //cursor position X
  //       offsetY = 0.5 - e.pageY / this.h, //cursor position Y
  //       dy = e.pageY - this.h / 2, //@h/2 = center of poster
  //       dx = e.pageX - this.w / 2, //@w/2 = center of poster
  //       theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
  //       angle = theta * 180 / Math.PI - 90, //convert rad in degrees
  //       offsetPoster = 20,
  //       transformPoster = 'translate3d(' + offsetX * offsetPoster + 'px,' + offsetY * offsetPoster + 'px,20px)'

  //       //get angle between 0-360
  //       if (angle < 0) {
  //         angle = angle + 360;
  //       }

  //       this.setState({transformPoster:transformPoster});
  // }

  getConent(content){
    const reg = /<[^>]*>/g;
    const tcontent = content.replace(reg, " ");
    const length = document.body.clientWidth < 1050 ? 120 : 200;
    if(tcontent.length < length){
      return tcontent
    }else{
      return tcontent.slice(0, length) + "...";
    }
  }

  getLogs(){
    const logs = this.state.logs;
    return(
      logs.map(( log, _) => {
        return (
         <Parallax
          animation={{opacity: 1, playScale: [0.2, 0.6], y: 0}}
          style={{opacity: 0, transform: "translateY(50px)"}}
          className="home-log-container" key={_} onClick={this.goToOpenLog(log.id)}
         >
            <div className='log-img' style={{backgroundImage:"url(" + server + "/pic/" + log.imgName + ")"}}>
            </div>
            <div className='log-content'>
              <h2>{log.title}</h2><br></br>
              <div>{log.day}</div>
              <p>{log.content}</p>
            </div>
         </Parallax>
        )
      })
    )
  }

  goToOpenLog = (id) => {
    return () => {
      this.props.history.push("/Log/" + id);
    }
  }

  render() {
    const ready = this.state.ready;
    const logs = this.getLogs();
    return ready ? (<div id="home-container">
      <header className="banner" style={{height: document.body.clientHeight || window.clientHeight}}>
        <span className="background"></span>
        <span className="background-two"></span>           
        <h1><span>猛 一 回 头  &nbsp;&nbsp;&nbsp; 二 狗 就 在</span><embed src={require("../../images/logs/logo-word.svg")}></embed><span>灯 火 阑 珊 处</span></h1>
      </header>
      <div>
        {logs}
      </div>
    </div>) : <Loading noMenuButton={true}/>
  }
}

