import React from "react";
import { Icon} from 'antd';
import {server,AjaxGetRequest} from "../service"
import {URLMAPCODE} from "../urlMap";

export default class LogDetail extends React.Component{

    state = {
      data : {},
      isUrl : false, // 如果是按照网址直接跳转为true
      className : "open-log",
    }

    lastScrollY = 0;

    componentDidMount(){
      const match = this.props.match || {};
      if(match.params && match.params.id){
        const success = res => {
          this.setState({data: res.data})
        }
        AjaxGetRequest(URLMAPCODE.GET_LOG, {id:  match.params.id}, success);
        this.setState({isUrl: true});
      }

    }

    render(){
      let { isUrl, data, className} = this.state;
      let handleClose = this.props.closeLog;
      if(!isUrl){
        data = this.props.data || {};
      }else{
        handleClose = () => {
            this.props.history.push("/Log");
        }
      }

      const masterUrl = data.master ? data.master : "null";
      const style = data.imgName ? {backgroundImage: 'url(' +  server + "/pic/" + data.imgName + ')'} : {};

      return data.imgName ? <div className={className}>
              <div className="log-bg" style={style}>
                <div className="zhezhao"></div>
                <div className="head">
                  <span onClick={handleClose}><Icon type="menu-fold" /></span>
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
                  <img src={require(`../../images/user/${masterUrl}.png`) } alt="master"></img>
                  <ul>
                    <li>{data.master}</li>
                    <li>{data.day} &nbsp; {data.time} &nbsp; </li>
                    <li>Read:{data.read} &nbsp; Comment:{data.comment}</li>
                  </ul>
                </div>
                <div className="log-title">{data.title}</div>
                <div dangerouslySetInnerHTML={{ __html: data.content}}/>
              </div>
            </div> : <div/>
    }
  }