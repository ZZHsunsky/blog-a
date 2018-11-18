import React from "react";
import { Avatar} from 'antd';

export default class LogDetail extends React.Component{
    render(){
      const data = this.props.data || {}; 
      const imgUrl = data.imgName ? require("../../images/logs/" + data.imgName) : ""; 
      const style = data.imgName ? {backgroundImage: 'url(' + imgUrl + ')'} : {};
      return <div className="open-log">
              <div className="log-bg" style={style}>
                <div className="log-title">
                  <time className="log-time">
                    <span>{data.day}</span>
                    <span>{data.time}</span>
                  </time>
                  <h2>{data.title}</h2>
                  <h3>
                    <Avatar shape="square" size={50} icon="user" />
                    {data.master}
                  </h3>
                </div>
              </div>
              <div className="log-label">
                <div dangerouslySetInnerHTML={{ __html: data.content}}/>
              </div>
              <div className="log-button">
                <span>PREV</span>
                <span>NEXT</span>
                <span onClick={this.props.closeLog}>CLOSE</span>
                <span>COMMIT</span>
              </div>
            </div>
    }
  }