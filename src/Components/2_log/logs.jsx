import React from 'react';
import QueueAnim from 'rc-queue-anim';
import './log.less';
import SingleLog from "./singleLog";
import OpenLog from "./openLog";
import {AjaxGetRequest} from "../service";
import {URLMAPCODE} from "../urlMap";
import Loading from "../loading/Loading";
import navHandle from "../navagition/navHandle";

export default class LogContent extends React.Component{

    state = {
        open: false,
        logDetail: {},
    }
    componentDidMount(){
        const success = res => {
            const data =res.data || [];
            this.setState({
              logs: data,
              selectLogIdx: 0,
            });
        }
        AjaxGetRequest(URLMAPCODE.GET_LOGS, {}, success, () => {});
    }

    getLogList(logs, open){
        const className = open === true ? 'log-list log-list-close':'log-list';
        const logsList = logs.map( (log, _) =>{
            log.idx = _;
            return <SingleLog 
                        key={_}
                        data={log}
                        openLog={this.openLog.bind(this)}
                    />
        })
        return <div className={className}>
            <QueueAnim delay={0} className="queue-simple">
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
        
        AjaxGetRequest(URLMAPCODE.LOG_ACCESS, {id: logDetail.id, type: "read"});
        navHandle.setClassName("none");
    }

    closeLog(){
        this.state.elem && this.state.elem.close();
        navHandle.setClassName(""); 
        this.setState({open: false,});
        const self = this;
        setTimeout( () => {
            self.setState({logDetail:{}})
        }, 1000)
    }

    render(){
        const {logs, open, logDetail} = this.state;
        const logList = this.getLogList(logs || [], open);
        const openLog = this.getOpenLog(logDetail, open);

        return ( logs || [] ).length > 0 ? <div className="log-container">
            {openLog}
            {logList}
        </div> : <Loading/>
    }
}