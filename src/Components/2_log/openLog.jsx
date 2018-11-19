import React from "react";
import { Icon} from 'antd';

export default class LogDetail extends React.Component{
    render(){
      const data = this.props.data || {}; 
      const imgUrl = data.imgName ? require("../../images/logs/" + data.imgName) : "";
      const masterUrl = data.master ? data.master : "null";
      const style = data.imgName ? {backgroundImage: 'url(' + imgUrl + ')'} : {};
      return <div className="open-log">
              <div className="log-bg" style={style}>
                <div className="zhezhao"></div>
                <div className="head">
                  <span onClick={this.props.closeLog}><i>BACK</i></span>
                  <span><embed src={require("../../images/logs/logo-word.svg") }/></span>
                  <span><Icon type="message" /></span>
                </div>
                <div className="bottom">
                  <div className="left">
                    <Icon type="heart" theme="filled" /> <span>Likes &nbsp; {data.like}</span>
                  </div>
                  <div className="right">

                  </div>
                </div>
              </div>
              <div className="log-label">
                <div className="desc"><span>{data.group}</span></div>
                <div className="desc">
                  <img src={require(`../../images/user/${masterUrl}.png`) }></img>
                  <ul>
                    <li>{data.master}</li>
                    <li>{data.day} &nbsp; {data.time} &nbsp; Read:{data.read} &nbsp; Comment:{data.comment}</li>
                  </ul>
                </div>
                <div className="log-title">{data.title}</div>
                <div dangerouslySetInnerHTML={{ __html: data.content}}/>
              </div>
            </div>
    }
  }