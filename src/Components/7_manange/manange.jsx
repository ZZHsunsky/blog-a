import React from 'react';
//import UploadLog from './uploadlog'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./manange.less";
import LoginPanel from "./Component/loginPanel"
import Function from "./Component/funcition"
export default class Manage extends React.Component{
      state = {
        hasLogin:true,
        userInfo:{},
      }
      handleChangeLogin = () =>{
          this.setState({hasLogin:true})
      }
      render() {
        return (
          <div>
            {this.state.hasLogin === false ? <LoginPanel login={this.handleChangeLogin.bind(this)} />: <Function/>}
          </div>
        );
      }
}

