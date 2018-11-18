import React from "react";
import { Avatar} from 'antd';

export default class SingleLog extends  React.Component{


    open(){
      const _ = this.props.data && this.props.data.idx;
      this.props.openLog(this, _);
    }
  
    close(){
      this.setState({style:{}});
    }
         
    render(){
      const data = this.props.data || {};
      const style = data.style || {};

    return <div className="tmlog" onClick={this.open.bind(this)} style={style}>
        <div className="log-tags-icon">
            <Avatar shape="square" size={80} icon="user" />
        </div>
        <div className="log-label">
            <time className="log-time"><span>{data.day}</span><span>{data.time}</span><span><Avatar shape="square" size={"middle"} icon="user" /></span></time>
            <h2>{data.title}</h2>
            <p>{data.content}</p>
        </div>
    </div>
    }
  }