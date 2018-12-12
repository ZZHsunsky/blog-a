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

    render(){
      const data = this.props.data || {};
      const master = data.master || "zzh";
      const content = this.getConent(data.content || "");

    return <div className={"tmlog"} onClick={this.open.bind(this)}>
        <div className="log-tags-icon">
            <Avatar shape="square" size={80} src={require(`../../images/user/${master}.png`)} />
        </div>
        <div className="log-label">
            <time className="log-time"><span>{data.day}</span><span>{data.time}</span><span><Avatar shape="square" size={"large"} src={require(`../../images/user/${master}.png`)} /></span></time>
            <div/><h2>{data.title}</h2>
            <p>{content}</p>
        </div>
    </div>
    }
  }