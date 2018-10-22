import React from 'react';
import './App.css'
import { Layout,  } from 'antd';
import Nav from './Components/navagition/nav'
import Home from './Components/1_home/home'
import Log from './Components/2_log/log'
import Photo from './Components/3_photo/photo'
import Memory from './Components/4_memory/memory'
import Travel from './Components/5_travel/travel'
import ToDo from './Components/6_todo/todo'
import Manage from './Components/7_manange/manange'
import {BrowserRouter,Route} from 'react-router-dom'

const { Content, Footer } = Layout;

export default class App extends React.Component {
  state = {
    current: 1,
  }

  render() {
    return (
      <BrowserRouter basename='/Denghuo'>
        <Layout style={{background:'#fff'}}>   
            <Nav></Nav>
            <Content>
            <div style={{background: '#fff', minHeight: document.documentElement.clientHeight || document.body.clientHeight }}>
              <Route exact path="/" component={Home}></Route>
              <Route  path="/Log" component={Log}></Route>
              <Route  path="/Photo" component={Photo}></Route>
              <Route  path="/Memory" component={Memory}></Route>
              <Route  path="/Travel" component={Travel}></Route>
              <Route  path="/ToDo" component={ToDo}></Route>
              <Route  path="/Manage" component={Manage}></Route>
            </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                  DWJ-ZZH
            </Footer>     
        </Layout>
      </BrowserRouter>
    );
  }
}

