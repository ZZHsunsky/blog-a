import React from 'react'
import './nav.less'


export default class TodoContent extends React.Component{

    render(){
        return <div>
            <label>
                <input type="checkbox"></input>
                <span className="menu">
                    <span className="hamburger"></span>
                </span>
                <ul>
                    <li onClick={this.props.switchContent(1)}><a>Home</a></li>
                    <li onClick={this.props.switchContent(2)}><a>心情·日志</a></li>
                    <li onClick={this.props.switchContent(3)}><a>瞬间·回忆</a></li>
                    <li onClick={this.props.switchContent(4)}><a>往事·时间</a></li>
                    <li onClick={this.props.switchContent(5)}><a>足迹·旅行</a></li>
                    <li onClick={this.props.switchContent(6)}><a>未来·可期</a></li>
                    <li onClick={this.props.switchContent(7)}><a>主人·你好</a></li>
                </ul>
            </label>
        </div>
    }
}