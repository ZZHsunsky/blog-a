import React from 'react';
import QueueAnim from 'rc-queue-anim';
import axios from 'axios';
import './log.less';
import { Avatar} from 'antd';

export default class LogContent extends React.Component{

     state = {
        show: false,
        log:[],
        logDetail:{
            day:'',
            title:'',
            text:'',
            time:'',
        },
        selecorStyle:{
          left:'0',
          width:'20px'
        }
      };

      handeOpenLog(element){
        return ()=>{
          this.setState({
            show:true,
          })
        }
      }

      handleCloseLog(){
        return()=>{
          this.setState({show:false});
        }
      }

      handleSelector(idx){
        return () => {
          console.log(idx);
        }
      }

      componentDidMount(){
        axios.get('http://localhost:8900/getLogs')
          .then(res => {
            const data =res.data;
            this.setState({
              log:data,
              logDetail:data[0]});
          })
      }

      render() {
        if(this.state.log.length>0)
          return (
            <div className="log-container">
                {/* <nav className="tabs">
                  <div className="selector" style={this.state.selecorStyle}></div>
                  <a onClick={this.handleSelector(1)} className="active"><i className="fas fa-burn"></i>Avengers</a>
                  <a onClick={this.handleSelector(2)}><i className="fas fa-bomb"></i>Guardians of The Galaxy</a>
                  <a onClick={this.handleSelector(3)}><i className="fas fa-bolt"></i>Thor</a>
                  <a onClick={this.handleSelector(4)}><i className="fab fa-superpowers"></i>Black Panther</a>
                </nav> */}
              <div className={this.state.show === false?'log-list':'log-list log-list-close'}>
                <QueueAnim delay={5000} className="queue-simple">
                    {this.state.log.map((element,idx) =>{
                      return <SingleLog key={idx} data={element} handeOpenLog={this.handeOpenLog.bind(this)}></SingleLog>
                    })}
                </QueueAnim>
              </div>
              <div className={this.state.show === true?'log-detail log-detail-show':'log-detail'}>
                  <LogDetail data={this.state.logDetail} handeCloseLog={this.handleCloseLog.bind(this)} ></LogDetail>
              </div>
            </div>
          );
        else{
          return <div className="request-loading">
              Loading...
            </div>
        }
      }
};

class SingleLog extends  React.Component{

	render(){
		return <div className="tmlog" onClick={this.props.handeOpenLog(this.props.data.id)}>
              <div className="log-tags-icon">
                <Avatar shape="square" size={80} icon="user" />
              </div>
              <div className="log-label">
                <time className="log-time"><span>{"day"}</span><span>{"time"}</span><span><Avatar shape="square" size={"middle"} icon="user" /></span></time>
				        <h2>{this.props.data.title}</h2>
				        <p>{this.props.data.content}</p>
               </div>
				   </div>
	}
}

class LogDetail extends React.Component{
  render(){
    return <div className="tmlog" onClick={this.props.handeCloseLog()}>
            <div className="log-tags-icon">
              <Avatar shape="square" size={80} icon="user" />
            </div>
            <div className="log-label">
              <time className="log-time"><span>{"day"}</span><span>{"time"}</span><span><Avatar shape="square" size={"middle"} icon="user" /></span></time>
              <h2>{this.props.data.title}</h2>
              <p>{this.props.data.content}</p>
            </div>
          </div>
  }
}