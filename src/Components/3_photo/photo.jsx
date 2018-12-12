import React from 'react';
import Alum from "./alum"
import {AjaxGetRequest} from "../service"
import {URLMAPCODE} from "../urlMap";
// import QueueAnim from 'rc-queue-anim';
import Loading from "../loading/Loading";
import './photo.less'

export default class PhotoContent extends React.Component{

    state = {
        alums:[],
    }

    componentDidMount(){

        const success = res => this.setState({alums: res.data || []});
        AjaxGetRequest(URLMAPCODE.GET_ALUMS, {}, success)
    }

    getAlumsComp(){
        const {alums} = this.state;
        const alumComp = alums.map( (alum, _) => {
            return <Alum key={_} data={alum}/>
        })
        return alumComp;
    }

    render(){
        const alums = this.getAlumsComp();
        return alums ? <div className="photos">{alums}</div> : <Loading/>;
    }
}
