import React from 'react'
import {Input, Button} from "antd"

const InputGroup = Input.Group;

export default class funTravel extends React.Component {

    state = {
        x: 54,
        y: 20,
        mapWidth: 0,
        mapHeight: 0,
    }

    componentDidMount(){
        const map = document.getElementById("map-travel");
        const {height} = window.getComputedStyle(map);
        const mapHeight = parseFloat(height.substring(0, height.length - 2), 10);
        const mapWidth = mapHeight * 1.551;
        const InputWidth = document.body.clientWidth - mapWidth - 110;
        this.setState({InputWidth, mapHeight, mapWidth})
    }

    getMap(){
        const svgUrl = require("../../../images/map/mapGlobal.svg");
        const dibiao = require("../../../images/map/dibiao.svg");
        const {x , y, mapWidth, mapHeight} = this.state;
        const style = {left: x / 100 * mapWidth - 6, top: y / 100 * mapHeight - 4};

        return <div className="map-global" style={{height: document.body.clientHeight - 70}} >
            <embed src={svgUrl} id="map-travel"/>
            <embed src={dibiao} id="map-dibiao" style={style}/>
        </div>
    }

    setX = (x) =>{
        this.setState({x})
    }

    setY = (y) =>{
        this.setState({y})
    }

    getInput(){
        const {x , y, InputWidth} = this.state;

        return <div className="map-input" style={{width: InputWidth || 0}}>
            <Input addonBefore="城市："  defaultValue="北京" />
            <InputGroup compact>
                <Input style={{width: "45%"}} value={x} onChange={this.setX}/>
                <Input style={{width:"10%"}} placeholder="：" disabled/>
                <Input style={{width: "45%"}} value={y} onChange={this.setY}/>
            </InputGroup>
            <Button style={{width: "100%"}}>添加</Button>
        </div>
    }

    render(){
        const map = this.getMap();
        const mapInput = this.getInput();
        return <div className="fun-travel-container">{map}{mapInput}</div>
    }
}