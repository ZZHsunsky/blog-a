import React from 'react'
import {AjaxGetRequest} from "../../service";
import {URLMAPCODE} from "../../urlMap"
import {ACTIONCODE} from "../../actionMap";
import {message, Input} from "antd";

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
         if(retCode === ACTIONCODE.VERFIY_NO_USER){
          message.warning("no user");
         }else if(retCode === ACTIONCODE.VERFIY_WRONG_PASSWORD){
          message.warning("wrong password");
         }else if(retCode.length === 32){
          message.success("sucess");
          this.props.login(username, retCode);
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
        <h1>
          Denghuo
        </h1>
        <img src={require("../../../images/home/led-long-2.png")} alt="logo"/>
        <h2>
          Welcome Back!
          <em>SignIn To Be Master~ </em>
        </h2>
        <div className="form-container">
          <Input id="login-name" type="text" placeholder="UserName" onFocus={this.handleChangeFocus(0)}></Input>
          <Input id="login-password" type="password" placeholder="Password" onFocus={this.handleChangeFocus(1)}></Input>
          <svg width="390" height="549" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
             <rect id='rect' className={ this.state.focus === 0 ? "rect1" : "rect2"}   y="300px"   rx="27" ry="27" width="300px" height="50px" style={{stroke:"rgb(107, 146, 170)",strokeWidth:"1px",fill:"transparent"}} />
          </svg>
          <div className="sign-in-button" onClick={this.handleVerfiyUser.bind(this)} >SignIn</div>
        </div>
      </div>
      </div>
    }
  }