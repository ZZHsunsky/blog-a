import React from "react";
import { Avatar} from 'antd';

export default class LogDetail extends React.Component{
    render(){
      const data = this.props.data || {};
  
      return <div className="log-open" onClick={this.props.handeCloseLog}>
              <div className="log-tags-icon">
                <Avatar shape="square" size={80} icon="user" />
              </div>
              <div className="log-label">
                <time className="log-time"><span>{data.day}</span><span>{data.time}</span><span><Avatar shape="square" size={"middle"} icon="user" /></span></time>
                <h2>{data.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: data.content}}/>
              </div>
            </div>
    }
  }