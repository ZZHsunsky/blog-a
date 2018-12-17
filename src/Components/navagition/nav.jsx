import React from 'react'
import './nav.less'
import {NavLink} from 'react-router-dom'
import navHandle from "./navHandle";

export default class TodoContent extends React.Component{

    state = {
        ulStyle: {
            transform: "translateX(0) translateY(0)",
        },
        checked:false,
    }

    componentDidMount(){
       navHandle.setView(this);
    }

    handleMouseHover(idx){
        return () =>{
            var ulStyle = {}
            if((document.body.clientWidth || window.clientWidth ) <= 600){
                ulStyle.transform = "translateX(" + (-(idx-1) * 150) + 'px)';
            }else{
                ulStyle.transform = "translateY(" + (-(idx-1) * 29) + 'rem)';
            }
            this.setState({ulStyle});
        }
    }
    handleChecked(event){
        var checked = !this.state.checked;
        this.setState({checked});
    }

    handleMenuSwitch(){
        this.setState({checked:false});
    }

    render() {

        const className = this.state.className || "";

        return <div>
            <input id="menu-check" type="checkbox" className={className} checked={this.state.checked} onChange={this.handleChecked.bind(this)}></input>

            <div className={"menu-button " + className}>
                <span className="hamburger"></span>
                <span className="hamburger"></span>
                <span className="hamburger"></span>
            </div>

            <div className="menu">
                <div className="menu-body">
                    <ul>
                        <li onMouseEnter={this.handleMouseHover(1)} onClick={this.handleMenuSwitch.bind(this)}><NavLink to="/"><span>01</span>Home</NavLink></li>
                        <li onMouseEnter={this.handleMouseHover(2)} onClick={this.handleMenuSwitch.bind(this)}><NavLink to="/Log"><span>02</span>心情·日志</NavLink></li>
                        <li onMouseEnter={this.handleMouseHover(3)} onClick={this.handleMenuSwitch.bind(this)}><NavLink to="/Photo"><span>03</span>瞬间·回忆</NavLink></li>
                        {/* <li onMouseEnter={this.handleMouseHover(4)} onClick={this.handleMenuSwitch.bind(this)}><NavLink to="/Meomory"><span>04</span>往事·时间</NavLink></li> */}
                        <li onMouseEnter={this.handleMouseHover(4)} onClick={this.handleMenuSwitch.bind(this)}><NavLink to="/Travel"><span>04</span>足迹·旅行</NavLink></li>
                        <li onMouseEnter={this.handleMouseHover(5)} onClick={this.handleMenuSwitch.bind(this)}><NavLink to="/Todo"><span>05</span>未来-可期</NavLink></li>
                        <li onMouseEnter={this.handleMouseHover(6)} onClick={this.handleMenuSwitch.bind(this)}><NavLink to="/Manage"><span>06</span>主人·你好</NavLink></li>
                    </ul>
                </div>
                <div className="menu-label">
                <div className="container">
                    <ul style={this.state.ulStyle}>
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
                        {/* <li><span>04</span>往事·时间</li> */}
                        <li>
                            <div id="nav-travel">
                                <div className="train">
                                    <div className="windows"></div>
                                    <div className="lights"></div>
                                </div>
                                <div className="rails">
                                    <div className="ties"></div>
                                    <div className="ties"></div>
                                    <div className="ties"></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div id="nav-future">
                                FUTURE
                            </div>
                        </li>
                        <li>
                            <div id="nav-master">
                                HELLO MASTER
                            </div>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
    }
}