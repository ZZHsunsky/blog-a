import React from 'react';
import {Card, Icon} from 'antd';
import {server} from "../service";
import Loading from "../loading/Loading";
import './photo.less'
import navHandle from "../navagition/navHandle";

const { Meta } = Card;

export default class Alum extends React.Component{

    state = {
        open : false,
        openReady : false,
    }

    renderImages = []

    handleOpen = () => {
        this.setState({open: true});
        this.isImgLoad();
    }

    handleClose = () => {
        this.setState({open: false});
    }

    componentDidMount() {
        // this.isImgLoad();
    }

    getPhotos = () => {
        const {openReady} = this.state;
        const width = document.body.clientWidth || window.innerWidth;

        if(openReady){
            let col = 4;
            if(width < 1000 && width > 600){
                col = 3;
            }else if(width < 600){
                col = 2;
            }
            let heightArray = [];
            let imgArray = [];
            for(let _ = 0 ; _ < col; _ ++) {
                heightArray.push(0);
                imgArray.push([])
            };
            this.renderImages.map((photo, _) => {
                const idx = heightArray.indexOf(Math.min.apply(null, heightArray));
                heightArray[idx] += photo.height;
                imgArray[idx].push(<img key={_} src={photo.src} alt="alum-photos"/>)
                return null;
            })
            const comp = imgArray.map( (col, _) =>{
                return <div className="photo-col" key={_}>
                    {col}
                </div>
            })
            return comp;
        }
        return <Loading/>
    }

    isImgLoad = () => {
        const alum = this.props.data || {};
        const photos = alum.photos || [];

        if(this.renderImages.length === 0 ){
            photos.map( photo => {
                const img = new Image()
                img.src = server + "/pic/" + photo;
                this.renderImages.push(img);
                return null;
            })
        }

        const self = this;
        let count = 0;

        this.renderImages.map( img => {
            if(img.width) count ++;
            return null;
        })

        if(count === photos.length){
            this.setState({openReady: true});
        }else{
            setTimeout(function(){
                self.isImgLoad();
            }, 5000);
        }
    }

    render(){
        const alum = this.props.data || {};
        const {open} = this.state;
        const imgUrl = server + "/pic/" + alum.id + ".png";
        const photos = this.getPhotos();

        return <div className={"single-alum " + (open ? "open" : "")}>
            <div className="alum-card"> 
                <div className="zhezhao"></div>  
                <div className="alum-show" onClick={this.handleOpen} >
                    <div className="img" style={{backgroundImage: `url(${imgUrl})`}} />
                    <Meta
                        title={"相册" + alum.id}
                        description={alum.desc}
                    />
                </div>
                <div className={("alum-photos ")}>
                    <h2>{"相册" + alum.id } <span>{alum.desc}</span>  <Icon onClick={this.handleClose} type="close"/></h2>
                    {photos}
                </div>
            </div>
        </div>
    }
}