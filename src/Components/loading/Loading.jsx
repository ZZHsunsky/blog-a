import React from "react";
import "./Loading.less"
import navHandle from "../navagition/navHandle";

export default class Loading extends  React.Component{

    componentDidMount(){
        if(this.props.noMenuButton){
            navHandle.setClassName("none");
        }
    }

    componentWillUnmount(){
        if(this.props.noMenuButton){
            if(this.props.noMenuButton){
                navHandle.setClassName("no-bg")
            }else{
                navHandle.setClassName("");
            }         
        }
    }

    getLoading = () => {
        return (<span className="back">
        <span>L</span>
        <span>o</span>
        <span>a</span>
        <span>d</span>
        <span>i</span>
        <span>n</span>
        <span>g</span>
    </span>)
    }

    getLoadingHome = () => {
     return   (
        <div className="loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>)
    }

    render(){
        const loading = this.getLoadingHome();
        // return <div style={{textAlign: "center",position: "absolute",width: "100%" , top: "40%"}}>{loading}</div>;
        return loading;
    }
  }