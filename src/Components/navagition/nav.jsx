import React from 'react'
import './nav.less'


export default class TodoContent extends React.Component{

    state = {
        hovrIdx: 0,
    }
    handleMouseHover(idx){
        return () =>{
            this.setState({hovrIdx:idx - 1});
        }
    }
    render()
    {
        return <div>
            <input type="checkbox"></input>

            <div className="menu-button">
                <span className="hamburger"></span>
            </div>

            <div className="menu">
                <div className="menu-body">
                    <ul>
                        <li onMouseEnter={this.handleMouseHover(1)} onClick={this.props.switchContent(1)}><span>01</span>Home</li>
                        <li onMouseEnter={this.handleMouseHover(2)} onClick={this.props.switchContent(2)}><span>02</span>心情·日志</li>
                        <li onMouseEnter={this.handleMouseHover(3)} onClick={this.props.switchContent(3)}><span>03</span>瞬间·回忆</li>
                        <li onMouseEnter={this.handleMouseHover(4)} onClick={this.props.switchContent(4)}><span>04</span>往事·时间</li>
                        <li onMouseEnter={this.handleMouseHover(5)} onClick={this.props.switchContent(5)}><span>05</span>足迹·旅行</li>
                        <li onMouseEnter={this.handleMouseHover(6)} onClick={this.props.switchContent(6)}><span>06</span>未来-可期</li>
                        <li onMouseEnter={this.handleMouseHover(7)} onClick={this.props.switchContent(7)}><span>06</span>主人·你好</li>
                    </ul>
                </div>
                <div className="menu-label">
                <div className="container">
                    <ul style={{top:-this.state.hovrIdx * 23 + "rem"}}>
                        <li><div id="nav-home-level"> Hi！</div></li>
                        <li>
                            <div id="nav-log-level">
                                <span>U</span>
                                <span>&nbsp;</span>
                                <span>C</span>
                                <span>a</span>
                                <span>n</span>
                                <span>&nbsp;</span>
                                <span>U</span>
                                <span>&nbsp;</span>
                                <span>B</span>
                                <span>B</span>
                            </div>
                        </li>
                        <li><div id="nav-photo-level"><span></span><span></span></div></li>
                        <li><span>04</span>往事·时间</li>
                        <li><span>05</span>足迹·旅行</li>
                        <li><span>06</span>未来可期</li>
                        <li><span>06</span>主人·你好</li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    }
    // render(){
    //     return <div>
    //         <label>
    //             <input type="checkbox"></input>
    //             <span className="menu">
    //                 <span className="hamburger"></span>
    //             </span>
    //             <ul>
    //                 <li onClick={this.props.switchContent(1)}><a>Home</a></li>
    //                 <li onClick={this.props.switchContent(2)}><a>心情·日志</a></li>
    //                 <li onClick={this.props.switchContent(3)}><a>瞬间·回忆</a></li>
    //                 <li onClick={this.props.switchContent(4)}><a>往事·时间</a></li>
    //                 <li onClick={this.props.switchContent(5)}><a>足迹·旅行</a></li>
    //                 <li onClick={this.props.switchContent(6)}><a>未来·可期</a></li>
    //                 <li onClick={this.props.switchContent(7)}><a>主人·你好</a></li>
    //             </ul>
    //         </label>
    //     </div>
    // }
}