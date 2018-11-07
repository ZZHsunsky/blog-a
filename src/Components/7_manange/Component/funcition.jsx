import React from 'react'
import "./style.less"
import {BrowserRouter,Route,Link} from 'react-router-dom'
import FunHome from "./funHome";
import FunLog from "./funLog";
import FunMemory from "./funMemory";
import FunPhoto from "./funPhoto";
import FunTravel from "./funTravel";

export default class Function extends React.Component {

    getFunction(){
        return [
            {
                name:"首页展示",
                icon:"home.png",
                link:"funHome"
            },
            {
                name:"添加日志",
                icon:"log.png",
                link:"funLog"
            },
            {
                name:"上传照片",
                icon:"photo.png",
                link:"funPhoto"
            },
            {
                name:"添加回忆",
                icon:"memory.png",
                link:"funMemory"
            },
            {
                name:"添加足迹",
                icon:"travel.png",
                link:"funTravel"
            },
        ]
    }
    render(){
        const functions = this.getFunction();
        return <BrowserRouter>
            <div className="container">  
                {functions.map( fun => {
                    return <Link to={"/Manage/" + fun.link} className="function" key={fun.name}>
                            <img src={require("../../../images/" + fun.icon)} alt={fun.name}></img>
                            <span>{fun.name}</span>
                    </Link>
                })}
                <div className="function-body">
                    <Route to="/Manage/funHome>" component={FunHome} ></Route>
                    <Route to="/Manage/funLog>" component={FunLog} ></Route>
                    <Route to="/Manage/funPhoto>" component={FunPhoto} ></Route>
                    <Route to="/Manage/funMemory>" component={FunMemory} ></Route>
                    <Route to="/Manage/funTravel>" component={FunTravel} ></Route>
                </div>
            </div>
            </BrowserRouter>
    }
}