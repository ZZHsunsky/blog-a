import React from 'react'
import {Input, Button } from "antd";

const Search = Input.Search;

export default class funHome extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title:"title",
            desc:["haha","无敌"],
        }
    }

    getTitle(){
        return  <div className="title text-container">
                <h3>主页-TITLE</h3>
                <Search
                    placeholder="Title"
                    onSearch={value => console.log(value)}
                    enterButton="Set"
                    size="large"
                /></div>
    }

    getDesc(){
        const {desc} = this.state;
        const descInput = desc.map( (d, _) => {
            return <Search
                        key={_}
                        placeholder={d}
                        onSearch={value => console.log(value)}
                        enterButton="Set"
                        size="large"
                    />
        })
        const buttons = []
        if(desc.length < 3) {
            buttons.push(<Button key="plus" type="primary" shape="circle" icon="plus" onClick={this.handleDesc(0)} />)
        }
        if(desc.length > 0) {
            buttons.push(<Button key="minus" type="danger" shape="circle" icon="minus" onClick={this.handleDesc(1)}/>)
        }
        return <div className="desc text-container">
            <h3>主页-DESCRIPTION</h3>
            <div className="input-container">{descInput}</div>
            <div className="button-container">{buttons}</div>
        </div>
    }

    handleDesc(type){
        return () => {
            const desc = this.state.desc || [];
            if(type === 0){
                desc.push("请输入DESC");
            }else{
                desc.pop();
            }
            this.setState({desc});
        }    
    }
    getPreview(){
        const title = this.state.title || "title";
        const desc = (this.state.desc || []).map( (d,_) =>{
            return <li key={_}>{d}</li>
        })
        return <div className="pre-continer">
                <h3>{title}</h3>
                <ul>{desc}</ul>
            </div>
    }
    render(){
        const Title = this.getTitle()
        const desc = this.getDesc();
        const preview = this.getPreview();
        return <div className="fun-home-container">
                <div className="left">
                    <div className="text">
                        {Title}
                        {desc}
                    </div>
                    <div className="preview-pc preview">
                        <h3>PC-预览</h3>
                        {preview}
                    </div>
                </div>
                <div className="preview-phone preview">
                    <h3>Mobie-预览</h3>
                    {preview}
                </div>     
            </div>
    }
}