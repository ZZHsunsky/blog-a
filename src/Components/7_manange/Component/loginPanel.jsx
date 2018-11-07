import React from 'react'
import {AjaxGetRequest} from "../../service";
import {URLMAPCODE} from "../../urlMap"
import {ACTIONCODE} from "../../actionMap";
import {message} from "antd";

export default class LoginPanel extends React.Component{
    state = {
      focus:0,
    }
  
    handleChangeFocus(idx){
      return () =>{
        this.setState({focus:idx});
      }
    }
  
    handleVerfiyUser(){
      const username = document.getElementById("login-name").value;
      const password = document.getElementById("login-password").value;
      const succ = (res) => {
         var retCode = res.data.retCode;
         switch(retCode){
           case ACTIONCODE.VERFIY_NO_USER: message.warning("no user");break;
           case ACTIONCODE.VERFIY_WRONG_PASSWORD: message.warning("wrong password");break;
           case ACTIONCODE.VERFIY_SUCCESS: message.success("sucess");this.props.login();break;
           default:break;
         }
      };
      const fail = (res) => {console.log(res)}
      AjaxGetRequest(URLMAPCODE.VERIFY,{
        username,password
      },succ,fail)
    }
  
    render(){
      return <div id="log-container">
       <div id="login-panel">
        <div className="login-img"></div>
        <div className="form-container">
          <input id="login-name" type="text" placeholder="UserName" onFocus={this.handleChangeFocus(0)}></input>
          <input id="login-password" type="password" placeholder="Password" onFocus={this.handleChangeFocus(1)}></input>
          <svg width="390" height="549" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
             <rect id='rect' className={ this.state.focus === 0 ? "rect1" : "rect2"}   x="45px"  y="300px"   rx="27" ry="27" width="300px" height="50px" style={{stroke:"#000",strokeWidth:"1px",fill:"transparent"}} />
          </svg>
          <div className="sign-in-button" onClick={this.handleVerfiyUser.bind(this)} >SignIn</div>
        </div>
      </div>
      </div>
    }
  }