import React from 'react'
import {AjaxGetRequest, AjaxPostRequest} from "../../service"
import {URLMAPCODE} from "../../urlMap"
import Loading from "../../loading/Loading"
import { Card, Icon, message} from 'antd';
import {transformFileToDataUrl} from "../../uploadImg";
import {server} from "../../service"

export default class funPhoto extends React.Component {

    state = {
        alums : [],
        alumUpId : 0,
    }
    componentWillMount(){
       this.getAlums();
    }

    getAlums = () => {
        const success = res => this.setState({alums: res.data || []});
        AjaxGetRequest(URLMAPCODE.GET_ALUMS, {}, success)
    }

    getAlumsCompon = () => {
        const alums = this.state.alums || [];
        return (alums.map( (alum, _) => {
            return (
            <Card  
                key={_} 
                title={"相册" + alum.id} 
                extra={
                    <span>
                        <a>删除相册&nbsp;&nbsp;</a>
                        <a onClick={this.addPhoto(alum.id)}>上传照片</a>
                    </span>
                }>
                {
                    alum.photos.map((photo, __) => {
                        return <Card.Grid key={__} onClick={this.deletePhoto(alum.id, photo)}>
                            <div className="img" style={{backgroundImage: "url(" + server + "/pic/" + photo + ")"}}/>
                            <div className="delete"><Icon type="delete"/></div>
                        </Card.Grid>
                    })
                }
            </Card>);
        }))
    }

    deletePhoto = (id, photo) => {
       return () => {
        AjaxGetRequest(URLMAPCODE.DELETE_PHOTO, {id, photo}, this.getAlums);
       } 
    }

    addPhoto = (alumUpId) =>{
        return () =>{
            this.setState({alumUpId});
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = this.handleInputChange;
            input.click();
        }
    }

    callback = (filename) => {
        const {alumUpId} = this.state;
        if(alumUpId){
            AjaxPostRequest(URLMAPCODE.ADD_PHOTOS,{id: alumUpId, photos: [filename]}, this.getAlums);
        }
    }

    handleInputChange = (event) => {
        const file = event.target.files[0];
        const imgMasSize = 1024 * 1024 * 10; // 10MB
        // 检查文件类型
        if(['jpeg', 'png', 'jpg'].indexOf(file.type.split("/")[1]) < 0){
                message.warning("文件类型不对", 1);
                return;
        }
        // 文件大小限制
        if(file.size > imgMasSize ) {
                message.warning("文件大小超过10MB", 1);
                return;
        }
        transformFileToDataUrl(file, this.callback); 
    };

    render(){
        const alums = this.getAlumsCompon() || []
        return alums.length ? <div className="fun-photo-container">
            {alums}
        </div> : <Loading/>
    }
}