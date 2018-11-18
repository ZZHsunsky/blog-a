import React from 'react';
import QueueAnim from 'rc-queue-anim';
import axios from 'axios';
import './log.less';
import SingleLog from "./singleLog";
import OpenLog from "./openLog";

export default class LogContent extends React.Component{

    state = {
        open: false,
        logDetail: {},
    }
    componentDidMount(){
        axios.get('http://localhost:8900/getLogs')
          .then(res => {
            const data =res.data || [];
            this.setState({
              logs: data,
              selectLogIdx: 0,
            });
          })
    }

    getLogList(logs, open){
        const selectLogIdx = this.state.selectLogIdx;
        const className = open === true ? 'log-list log-list-close':'log-list';
        const logsList = logs.map( (log, _) =>{
            let style = {};
            if(open){
                if(_ === selectLogIdx) style= {opacity: 0, transform: "translateY(100vh)"};
                if(_  >  selectLogIdx) style.transform = "translateY(200vh)";
            }
            log.style = style;
            log.idx = _;
            return <SingleLog 
                        key={_}
                        data={log}
                        openLog={this.openLog.bind(this)}
                    />
        })
        return <div className={className}>
            <embed src={require("../../images/logo.svg")} width="300" height="100" type="image/svg+xml"/>
            <QueueAnim delay={5000} className="queue-simple">
               {logsList}
            </QueueAnim>
        </div>
    }

    getOpenLog(log, open){
        const className = open === true ? 'log-detail log-detail-show':'log-detail';
        return <div className={className}>
            <OpenLog
                data={log}
                closeLog={this.closeLog.bind(this)}
            />
        </div>
    }

    openLog(elem, _){
        const logs = this.state.logs || [];
        const logDetail = _ < logs.length ? logs[_] : {};
        this.setState({ open:true, logDetail, elem, selectLogIdx: _});
    }

    closeLog(){
        this.state.elem && this.state.elem.close(); 
        const logs = this.state.logs || [];
        this.setState({open: false, logDetail: {}});
    }

    render(){
        const {logs, open, logDetail} = this.state;
        const logList = this.getLogList(logs || [], open);
        const openLog = this.getOpenLog(logDetail, open);
        return ( logs || [] ).length > 0 ? <div className="log-container">
            {logList}
            {openLog}
        </div> : <div> loading </div>
    }
}