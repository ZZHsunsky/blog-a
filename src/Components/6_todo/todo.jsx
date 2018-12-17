import React from 'react'
import './todo.less'

export default class TodoContent extends React.Component{

    render(){
        return <div className="todo-container">
            <div id="container">
                Make
                <div id="flip">
                    <div><div>wOrK</div></div>
                    <div><div>lifeStyle</div></div>
                    <div><div>Everything</div></div>
                </div>
                AweSoMe!
            </div>
            <p>
                本猿正在努力开发中！~
            </p>
        </div>
    }
}