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
import {BrowserRouter,Route} from 'react-router-dom';
import OpenLog from "./Components/2_log/openLog";

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
    
  }


  getComponent(){
      return ( <BrowserRouter>
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
      </BrowserRouter>) 
  }

  render() {
    return this.getComponent()
  }
}

