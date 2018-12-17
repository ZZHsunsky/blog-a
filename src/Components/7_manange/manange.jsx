import React from 'react';
//import UploadLog from './uploadlog'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./manange.less";
import LoginPanel from "./Component/loginPanel"
import Function from "./Component/funcition"
import {SetCookie, GetCookie} from "../service";

export default class Manage extends React.Component{
      state = {
        hasLogin:false,
        userInfo:{},
      }

      handleChangeLogin = (username, token) =>{
          SetCookie("username", username);
          SetCookie("usertoken", token);
          this.setState({hasLogin: true})
      }

      componentDidMount(){
        const value = GetCookie("username");
        if(value){
          this.setState({hasLogin: true})
        }
      }

      render() {
        return (
          <div>
            {this.state.hasLogin === false ? <LoginPanel login={this.handleChangeLogin.bind(this)} />: <Function/>}
          </div>
        );
      }
}

