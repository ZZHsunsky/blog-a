import React from "react";
import { Icon, Input, Tabs, Avatar, Button, message, BackTop} from 'antd';
import {server,AjaxGetRequest, GetCookie, SetCookie, DeleteCookie, AjaxPostRequest} from "../service"
import {URLMAPCODE} from "../urlMap";
import navHandle from "../navagition/navHandle";
import Loading from "../loading/Loading";
const {TabPane } = Tabs;


export default class LogDetail extends React.Component{

    state = {
      data : {},
      isUrl : false, // 如果是按照网址直接跳转为true
      className : "open-log",
      comment : false,
      comments : null,
      hasLike : false,
      likeUsers : [],
    }

    guestAvatr = 12;

    componentDidMount(){
      const match = this.props.match || {};
      if(match.params && match.params.id){
        const success = res => {
          this.setState({data: res.data})
        }
        AjaxGetRequest(URLMAPCODE.GET_LOG, {id:  match.params.id}, success);
        this.getLikeUser(match.params.id);
        navHandle.setClassName("none");
        this.setState({isUrl: true});
      }

      const userName = GetCookie("username");
      const guest = GetCookie("guestInfo");

      if(userName){
        this.setState({userName, avatarName: userName});
      }else if(guest){
        const guestObj = JSON.parse(guest);
        this.setState({userName: guestObj.name, avatarName: guestObj.avatar});
      }
    }

    componentWillReceiveProps(newProps){
      const data = newProps.data || {};
      const id = data.id;

      if(id){
        if(id !== this.state.data.id){
          this.setState({data, comments: null, hasLike: false, likeUsers: []});
          this.getLikeUser(id);
        }
      }else{
        this.setState({data, comments: null, hasLike: false, likeUsers: []});
      }
    }

    handleLike = () => {
      const {userName, hasLike,} = this.state;
      console.log("handle Like");
      if(hasLike){
        return;
      }

      if(!userName){
        message.warning("请登录后再点赞~");
        this.setState({comment: true});
      }else{
        const self = this;
        const id = this.state.data && this.state.data.id;
        console.log(id);
        if(id){
          const success = () => {
            self.setState({hasLike: true});
          }
          AjaxGetRequest(URLMAPCODE.LOG_ACCESS, {id, type: "like", name: userName}, success)
        }
      }
    }

    handleComment = () => {
      const comment = !this.state.comment;
      const {comments, data} = this.state;
      if(!comments){
        this.getComments(data.id);
      }

      this.setState({comment});
    }

    submitComment = () => {
      const {userName, data, avatarName} = this.state;
      const self = this;
      if(!userName){
        message.warning("请登陆后发表评论");
        return;
      }else{
        const input =  document.getElementById("input-comment")
        const comment =input.value;
        input.value = "";
        if(comment.length <= 10){
          message.warning("评论不得少于十个字符~");
          return;
        }else{
          const date = new Date();
          const commentObj = {
            comment,
            userName,
            avatarName,
            time: date.toLocaleDateString() + "  " + date.getHours() + ":" + date.getMinutes(),
          }
          const success = () => {
            self.getComments(data.id);
          }
          AjaxPostRequest(URLMAPCODE.APPEND_LOG_COMMENT, {id: data.id, comment: JSON.stringify(commentObj)}, success)
        }
      }
    }

    getComments = (id) => {
      const self = this;
      const success = (res) => {
        if(res.data !== "Fail"){
          self.setState({comments: res.data});
        }
      }

      AjaxGetRequest(URLMAPCODE.GET_LOG_COMMENTS, {id}, success);
    }
    
    getLikeUser = (id) => {
      const success = (res) => {
        const likeUsers = res.data || [];
        if(likeUsers !== "Fail"){
          this.setState({likeUsers})
          this.handleHasLike(likeUsers);
        }
      }
      AjaxGetRequest(URLMAPCODE.GET_LOG_LIKE_USERS, {id},success)
    }

    getCommentsComp = () => {
      const {comments} = this.state;
      if(comments){
        const Comp = comments.map((comment, _) => {
          const obj = JSON.parse(comment);
          return <p className="comment-wrap" key={_}>
            <span><img src={require(`../../images/user/${obj.avatarName}.png`)}  alt="avatar"/>{obj.userName}<time>{obj.time}</time></span>
            <span>{obj.comment}</span>
          </p>
        })
        return Comp;
      }else{
        return <Loading/>
      }     
    }

    getGuest = (clientName, avatarName) => {
      let guset = <div/>;

      if(clientName){
          guset = <div className="guest">
          <img alt="user-avatar" src={require(`../../images/user/${avatarName}.png`)} />
          <h3>{clientName}</h3>
          <Button onClick={this.handleGuestLogOut} >注销登录</Button>
        </div>
      }else{
        const avatars = [];
        for(let _ = 0; _ < this.guestAvatr; _ ++){
          avatars.push(<Avatar 
                          key={_} 
                          size={40} 
                          src={require(`../../images/user/${_}.png`)}
                          onClick={this.handleGuestLogin(_)}
                        />);
        }
        guset = <div className="guest-no">
          <Input placeholder="请输入邮箱号或用户名" id="input-guest" />
          <div className="avatars">
            {avatars}
          </div>
          <p>点击头像验证登录,假如账号不存在则新建</p>
        </div>
      }

      return guset;
    }

    handleHasLike = (likeUsers) => {
      const index = likeUsers.indexOf(this.state.userName);
      if(index !== -1){
        this.setState({hasLike: true});
      }
    }

    handleGuestLogin = (avatar) => {
      return () => {
        const guestName = (document.getElementById("input-guest").value || "" ).replace(" ", "");
        if(guestName.length === 0){
          message.warning("用户名称不能为空");
          return;
        }else{
          const success = (res) => {
            if(res.data){
              if(res.data.retCode === "Success"){
                SetCookie("guestInfo", JSON.stringify({name: guestName, avatar}));
                const likeUsers = this.state.likeUsers || [];
                if(likeUsers.indexOf(guestName) !== -1){
                  this.setState({comment: true, userName: guestName, avatarName: avatar, hasLike: true})
                }else{
                  this.setState({comment: true, userName: guestName, avatarName: avatar});
                }

              }else{
                message.warning("用户名或头像验证失败~")
                this.setState({comment: true});
              }
            }
          }
          AjaxGetRequest(URLMAPCODE.GUEST_LOGIN, {guestName, avatar}, success)
          this.setState({comment: false});
        }
      }
    }

    handleGuestLogOut = () => {
      DeleteCookie("username");
      DeleteCookie("guestInfo");
      this.setState({userName: null, avatarName: null, hasLike: false});
    }

    render(){
      let { isUrl, data, className, comment, userName, avatarName, hasLike} = this.state;
      let handleClose = this.props.closeLog;
      const commentStyle = {transform : "translateY(" + (comment ? "0)" : "120vh)")}

      if(isUrl){
        handleClose = () => {
            this.props.history.push("/Log");
        }
      }

      const masterUrl = data.master ? data.master : "null";
      const style = data.imgName ? {backgroundImage: 'url(' +  server + "/pic/" + data.imgName + ')'} : {};
      const defaultKey = userName ? "1" : "2";

      return data.imgName ? <div className={className + (comment ? " show-comm" : "")}>
              <div className="comment-zhezhao" />
              <div className="log-bg" style={style}>
                <div className="zhezhao"></div>
                <div className="head">
                  <span onClick={handleClose}><Icon type="menu-fold" /></span>
                  <span><embed src={require("../../images/logs/logo-word.svg") }/></span>
                  <span onClick={this.handleComment}><Icon type="message" /></span>
                </div>
                <div className="bottom">
                  <div className="left">
                    <Icon type="heart" theme="filled" className={hasLike ? "active" : ""}  onClick={this.handleLike}/>
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
              <div className="log-comment" style={commentStyle}>
                <h2>
                  <Input placeholder="发表您的评论" id="input-comment"></Input>  
                  <Icon onClick={this.handleComment} type="close"/>
                  <Icon onClick={this.submitComment} type="upload"/>
                </h2>
                <Tabs defaultActiveKey={defaultKey} tabPosition="left">
                  <TabPane tab={<span><Icon type="profile" />评论区</span>} key={1}>{this.getCommentsComp()}</TabPane>
                  <TabPane tab={<span><Icon type="user" />用户区</span>} key={2}>{this.getGuest(userName, avatarName)}</TabPane>
                </Tabs>          
              </div>
              <BackTop>
                <div className="log-back-up">UP</div>
              </BackTop>
            </div> : <div/>
    }
  }