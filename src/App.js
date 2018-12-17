import React from 'react';
import './App.css'
import { Layout,  } from 'antd';
import Nav from './Components/navagition/nav';
import Home from './Components/1_home/home';
import Log from './Components/2_log/logs';
import Photo from './Components/3_photo/photo';
import Memory from './Components/4_memory/memory';
import Travel from './Components/5_travel/travel';
import ToDo from './Components/6_todo/todo';
import Manage from './Components/7_manange/manange';
import {Route, HashRouter} from 'react-router-dom';
import OpenLog from "./Components/2_log/openLog";
import {AjaxGetRequest, GetCookie, DeleteCookie} from "./Components/service";
import {URLMAPCODE} from "./Components/urlMap";

const { Content, } = Layout;

export default class App extends React.Component {
  state = {
    current: 1,
    ready: false,
  }


  componentDidMount(){
    // var src = '//cdn.jsdelivr.net/npm/eruda';
    // document.write('<script src="' + src + '"></script>');
    // document.write('<script>eruda.init();</script>');
    const username = GetCookie("username");
    const token = GetCookie("usertoken");
    if(username && token){
      console.log(URLMAPCODE.VERIFY_TOKEN);
      const success = (res) => {
        if(res.data){
          const retCode = res.data.retCode;
          if(retCode !== "Success"){
            DeleteCookie("username");
            DeleteCookie("usertoken");
          }
        }
      }

      AjaxGetRequest(URLMAPCODE.VERIFY_TOKEN, {username, token}, success)
    }else{
      DeleteCookie("username");
      DeleteCookie("usertoken");
    }
  }


  getComponent(){
      return ( <HashRouter>
        <Layout style={{background:'#fff'}}>
            <Nav/>
            <Content>
            <div style={{background: "#fafafa", minHeight: "100vh"}}>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/Log" component={Log}></Route>
              <Route  path="/Log/:id" component={OpenLog}></Route>
              <Route  path="/Photo" component={Photo}></Route>
              <Route  path="/Memory" component={Memory}></Route>
              <Route  path="/Travel" component={Travel}></Route>
              <Route  path="/ToDo" component={ToDo}></Route>
              <Route  path="/Manage" component={Manage}></Route>
            </div>
            </Content>    
        </Layout>
      </HashRouter>) 
  }

  render() {
    return this.getComponent()
  }
}

