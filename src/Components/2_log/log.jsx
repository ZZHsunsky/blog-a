import React from 'react';
import QueueAnim from 'rc-queue-anim';
import axios from 'axios';
import './log.less';
import { Timeline,Avatar} from 'antd';

export default class LogContent extends React.Component{

     state = {
        show: true,
        log:[],
        logDetail:{
            day:'',
            title:'',
            text:'',
            time:'',
        }
      };

      handeOpenLog(element){
        return ()=>{
          var show = this.state.show;
          this.setState({
            show:!show,
          })
        }
      }

      componentDidMount(){
        axios.post('https://easy-mock.com/mock/5baaf16393506e124a1dab5d/example/logRequest')
          .then(res => {
            const data =res.data.data.testLog;
            this.setState({
              log:data,
              logDetail:data[0]});
          })
      }

      render() {
        if(this.state.log.length>0)
          return (
            <div className="log-container">
              <div className={this.state.show === true?'log-list':'log-list log-list-close'}>
                <QueueAnim delay={300} className="queue-simple">
                    {this.state.log.map((element,idx) =>{
                      return <SingleLog key={idx} data={element} handeOpenLog={this.handeOpenLog.bind(this)}></SingleLog>
                    })}
                </QueueAnim>
              </div>
              <div className={this.state.show === true?'log-detail':'log-detail log-detail-show'}>
                  <LogDetail data={this.state.logDetail}></LogDetail>
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
                <time className="log-time"><span>{this.props.data.day}</span><span>{this.props.data.time}</span><span><Avatar shape="square" size={"middle"} icon="user" /></span></time>
				        <h2>{this.props.data.title}</h2>
				        <p>{this.props.data.text}</p>
               </div>
				   </div>
	}
}

class LogDetail extends React.Component{
  render(){
    return <div className="tmlog">
            <div className="log-tags-icon">
              <Avatar shape="square" size={80} icon="user" />
            </div>
            <div className="log-label">
              <time className="log-time"><span>{this.props.data.day}</span><span>{this.props.data.time}</span><span><Avatar shape="square" size={"middle"} icon="user" /></span></time>
              <h2>{this.props.data.title}</h2>
              <p>{this.props.data.text}</p>
            </div>
          </div>
  }
}