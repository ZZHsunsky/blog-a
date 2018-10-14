import React from 'react'
import { List, Avatar, Icon, Skeleton } from 'antd';
import './memory.less'
import reqwest from 'reqwest';

export default class MemoryContent extends React.Component{
    
    state = {
        initLoading: true,
        loading: false,
        data: [],
        list: [],
      }
    
      render() {
        return <div><MemoryCard></MemoryCard>
                <MemoryCard></MemoryCard>
                <MemoryCard></MemoryCard></div>
      }
}

class MemoryCard extends React.Component {
  state = {
    expand:false,
  }
  handleExpand(event){
    var expand = !this.state.expand;
    console.log(expand);
    this.setState({expand:expand});
  }
  render(){
   return <div className={this.state.expand === false ? "memory-card" :"memory-card card-expand" }>
            <div className="crad-head">
              <div className="card-head-img">
                <Avatar shape="square" size={64} icon='user'></Avatar>
              </div>
              <div className='card-head-title'>
                <h2>纪念日</h2>
                <p>已经1213天</p>
              </div>
              <div className="card-head-button" onClick={this.handleExpand.bind(this)}>
                <p>查看详情</p>
                <Icon type="up" theme="outlined" />
              </div>
              <div className="card-head-desc">
                查看详情
              </div>
            </div>
            <div className="card-body">
                <div className='card-body-tab'><Icon type="smile" theme="twoTone" />距离下一目标</div>
                <div className='card-body-tab'><Icon type="hourglass" theme="twoTone" />修改日期</div>
                <div className='card-body-tab'><Icon type="delete" theme="twoTone" />舍弃纪念日</div>
            </div>
          </div>
  }
}