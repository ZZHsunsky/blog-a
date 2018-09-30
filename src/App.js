import React from 'react';
import './App.css';

import { Layout, Menu, Icon } from 'antd';
import Home from './Components/1_home/home'
import Log from './Components/2_log/log'
import Photo from './Components/3_photo/photo'
import Memory from './Components/4_memory/memory'
import Travel from './Components/5_travel/travel'
import ToDo from './Components/6_todo/todo'

const { Header, Content, Footer, Sider } = Layout;

export default class App extends React.Component {
  state = {
    current: 1,
    showContent:[<Home></Home>,<Log></Log>,<Photo></Photo>,<Memory></Memory>,<Travel></Travel>,<ToDo></ToDo>],
  }

  handleClick = (e) => {
    this.setState({
      current: parseInt(e.key),
    });
  }

  render() {
    return (
      <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleClick}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span className="nav-text">Show Home</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span className="nav-text">随笔·日志</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span className="nav-text">回忆·相册</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="user" />
            <span className="nav-text">日子·纪念</span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="user" />
            <span className="nav-text">足迹·旅行</span>
          </Menu.Item>
          <Menu.Item key="6">
            <Icon type="user" />
            <span className="nav-text">计划·ToDo</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: document.documentElement.clientHeight || document.body.clientHeight }}>
            {this.state.showContent[this.state.current-1]}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
    );
  }
}

