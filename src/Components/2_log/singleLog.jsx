import React from "react";
import { Avatar} from 'antd';

export default class SingleLog extends  React.Component{


    open(){
      const _ = this.props.idx;
      this.setState({style:{opacity: 0}});
      this.props.openLog(this, _);
    }
  
    close(){
      this.setState({style:{}});
    }
  
    render(){
      const data = this.props.data || {};
      const transform = data.type === 0 ? "translateY(-100vh)" : "translateY(100vh)";
  
    return <div className="tmlog" onClick={this.open.bind(this)} style={this.state.style}>
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