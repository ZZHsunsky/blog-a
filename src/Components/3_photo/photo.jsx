import React from 'react';
import axios from 'axios';
import {Card,Avatar,Icon} from 'antd';
import QueueAnim from 'rc-queue-anim';
import './photo.less'
const {Meta} = Card;

export default class PhotoContent extends React.Component{

    state = {
        alum:[],
        openAlum:false,
        alumExpand:[],
    }

    componentDidMount(){
        axios.post('https://easy-mock.com/mock/5baaf16393506e124a1dab5d/example/photoRequest')
          .then(res => {
            const data =res.data.detaile;
            this.setState({
              alum:data,
            })
        })
    }

    handleAlumOpen = (id) =>{
        return ()=>{
            var temp = this.state.alum[id].photoSrc;
            this.setState({openAlum:true,alumExpand:temp});
        }
    }
    handleAlumClose = () =>{
        return ()=>{
            this.setState({openAlum:false});
        }
    }

    render(){
        if(this.state.alum.length > 0){
            return <div id="photo-container">
                <div className={this.state.openAlum === true? 'alum alum-open':'alum'}>
                <QueueAnim delay={300} className="queue-simple" animConfig={[
                { opacity: [1, 0], translateY: [0, 80] },
                { opacity: [1, 0], translateY: [0, -80] }
                ]}>
                    {this.state.alum.map((item,i) =>{
                        return <SingleAlum key={i} title={item.name} desc={item.desc} idx={i} alumId={item.id} openLog={this.handleAlumOpen.bind(this)}></SingleAlum>
                    })}
                </QueueAnim>
                </div>
                <div className={this.state.openAlum === true? 'alum-expand alum-open':'alum-expand'}>
                    <AlumExpand photos={this.state.alumExpand} close={this.handleAlumClose.bind(this)}></AlumExpand>
                </div>
            </div>
        }else{
            return <div>
              Loading
            </div>
        }
       
    }
}

class SingleAlum extends React.Component{
    render(){
        return<div className='single-alum' onClick={this.props.openLog(this.props.idx)}>
         <Card hoverable cover={<img alt="example" src={require("../../images/alum_"+ this.props.alumId%6 +".png") }/>}>
            <Meta title={this.props.title} description={this.props.desc} />
        </Card>
        </div>
    }
}

class AlumExpand extends React.Component{

    render(){
        return <div>
                    <div className="alum-expand-head" onClick={this.props.close()}>
                        <Avatar shape="square" size={80} icon="user" />
                    </div>
                    <div className="alum-expand-body">
                    {this.props.photos.map((item,id) =>{
                        return <div key={id} className="alum-single-photo">
                                    <img alt="alum-single" src={require("../../images/" + item.src)} />
                                    <span>haha</span>
                                </div>
                    })}
                    </div>
                </div>
    }
}