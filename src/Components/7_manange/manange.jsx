import React from 'react'
//import UploadLog from './uploadlog'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./manange.less"

export default class Manage extends React.Component{
      state = {
        hasLogin:false,
        userInfo:{},
      }
      render() {
        return (
          <div>
            {this.state.hasLogin === false ? <LoginPanel></LoginPanel> : <div>登陆成功</div>}
          </div>
        );
      }
}

class LoginPanel extends React.Component{
  state = {
    focus:0,
  }

  handleChangeFocus(idx){
    return () =>{
      this.setState({focus:idx});
    }
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
        <div className="sign-in-button" >SignIn</div>
      </div>
    </div>
    </div>
  }
}