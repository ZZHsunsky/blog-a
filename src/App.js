import React from 'react';
import './App.css'
import { Layout, Menu, Icon } from 'antd';
import Nav from './Components/navagition/nav'
import Home from './Components/1_home/home'
import Log from './Components/2_log/log'
import Photo from './Components/3_photo/photo'
import Memory from './Components/4_memory/memory'
import Travel from './Components/5_travel/travel'
import ToDo from './Components/6_todo/todo'
import Manage from './Components/7_manange/manange'

const { Header, Content, Footer } = Layout;

export default class App extends React.Component {
  state = {
    current: 1,
    showContent:[<Home></Home>,<Log></Log>,<Photo></Photo>,<Memory></Memory>,<Travel></Travel>,<ToDo></ToDo>,<Manage></Manage>],
  }

  handleClick(e){
    return () =>{
      this.setState({current:Number(e)});
    }
  }
  render() {
    return (
      <Layout style={{background:'#fff'}}>
        <Nav switchContent={this.handleClick.bind(this)}></Nav>
        <Content>
          <div style={{background: '#fff', minHeight: document.documentElement.clientHeight || document.body.clientHeight }}>
            {this.state.showContent[this.state.current-1]}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

