import React from 'react'
import { Tabs } from 'antd';
import FunHome from "./funHome";
import FunLog from "./funLog";
import FunMemory from "./funMemory";
import FunPhoto from "./funPhoto";
import FunTravel from "./funTravel";

const TabPane = Tabs.TabPane;
export default class Function extends React.Component {

    callback(key){
        console.log(key);
    }
    getFunction(){
        return [
            {
                name: "首页展示",
                icon: "home.png",
                link: <FunHome/>
            },
            {
                name: "添加日志",
                icon: "log.png",
                link: <FunLog/>
            },
            {
                name: "上传照片",
                icon: "photo.png",
                link: <FunPhoto/>
            },
            {
                name: "添加回忆",
                icon: "memory.png",
                link: <FunMemory/>
            },
            {
                name:"添加足迹",
                icon:"travel.png",
                link:<FunTravel/>
            },
        ]
    }

    getTabPanel(){
        const functions = this.getFunction();
        const tabs = functions.map( (fun, _ ) => {
            return <TabPane tab={fun.name} key={_}>{fun.link}</TabPane>
        })
        return <Tabs onChange={this.callback}>{tabs}</Tabs>
    }
    render(){
        const tabs = this.getTabPanel();
        return (
            <div className="fun-container">  
                {tabs}
            </div>)
    }
}