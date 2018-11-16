import React from 'react';
import QueueAnim from 'rc-queue-anim';
import axios from 'axios';
import './log.less';
import { Avatar} from 'antd';

export default class LogContent extends React.Component{

     state = {
        show: false,
        logs: [],
        logDetail: { },
        _: 0,
        selecorStyle: {
          left:'0',
          width:'20px'
        }
      };

      handeOpenLog(elem, _){
          const logs = this.state.logs || [];
          const logDetail = _ < logs.length ? logs[_] : {};
          this.setState({ show:true, logDetail, elem, _, height: "auto"});
      }

      handleCloseLog(){
        this.state.elem && this.state.elem.close(); 
        const logs = this.state.logs || [];
        const height = ( logs.length * 300 ) + 150;
        this.setState({show:false, height,});
      }

      handleSelector(idx){
        return () => {
          console.log(idx);
        }
      }

      componentDidMount(){
        axios.get('http://localhost:8900/getLogs')
          .then(res => {
            const data =res.data || [];
            this.setState({
              logs:data,
              logDetail:data[0],
              height:data.length * 300 + 100,
            });
          })
      }

      render() {
        const {logs, show, logDetail, height, _} = this.state;
        if((logs || []).length>0)
          return (
            <div className="log-container" style={{height: height}}>
                {/* <nav className="tabs">
                  <div className="selector" style={this.state.selecorStyle}></div>
                  <a onClick={this.handleSelector(1)} className="active"><i className="fas fa-burn"></i>Avengers</a>
                  <a onClick={this.handleSelector(2)}><i className="fas fa-bomb"></i>Guardians of The Galaxy</a>
                  <a onClick={this.handleSelector(3)}><i className="fas fa-bolt"></i>Thor</a>
                  <a onClick={this.handleSelector(4)}><i className="fab fa-superpowers"></i>Black Panther</a>
                </nav> */}
              <div className={show === true?'log-detail log-detail-show':'log-detail'}>
                  <LogDetail data={logDetail} handeCloseLog={this.handleCloseLog.bind(this)} />
              </div>
              <div className={show === false?'log-list':'log-list log-list-close'}>
                <embed src={require("../../images/logo.svg")} width="300" height="100" type="image/svg+xml"/>
                <QueueAnim delay={5000} className="queue-simple">
                    {logs.map((element,idx) =>{
                      element.type = idx > _ ? 1 : 0;
                      return <SingleLog key={idx} idx={idx} data={element} handeOpenLog={this.handeOpenLog.bind(this)}/>
                    })}
                </QueueAnim>
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

  state = {
    style: {},
  }

  open(){
    const _ = this.props.idx;
    this.setState({style:{transform: "translateY(100vh)",marginBottom:"200vh",opacity: 0}});
    this.props.handeOpenLog(this,_);
  }

  close(){
    this.setState({style:{}});
  }

	render(){
    const data = this.props.data || {};
    const transform = data.type === 0 ? "translateY(-100vh)" : "translateY(100vh)";

		return <div className="tmlog" onClick={this.open.bind(this)} style={this.state.style}>
              <div className="log-tags-icon">
                <Avatar shape="square" size={80} icon="user" />
              </div>
              <div className="log-label">
                <time className="log-time"><span>{data.day}</span><span>{data.time}</span><span><Avatar shape="square" size={"middle"} icon="user" /></span></time>
				        <h2>{data.title}</h2>
				        <p>{data.content}</p>
               </div>
				   </div>
	}
}

class LogDetail extends React.Component{
  render(){
    const data = this.props.data || {};

    return <div className="log-open" onClick={this.props.handeCloseLog}>
            <div className="log-tags-icon">
              <Avatar shape="square" size={80} icon="user" />
            </div>
            <div className="log-label">
              <time className="log-time"><span>{data.day}</span><span>{data.time}</span><span><Avatar shape="square" size={"middle"} icon="user" /></span></time>
              <h2>{data.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: data.content}}/>
            </div>
          </div>
  }
}