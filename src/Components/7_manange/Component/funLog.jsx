import React from 'react'
import {Input, Button, Icon, AutoComplete, message, Upload} from "antd";
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { transformFileToDataUrl } from "../../uploadImg";
import {GetCookie, AjaxPostRequest, AjaxGetRequest, server} from "../../service";
import {URLMAPCODE} from "../../urlMap";
import UploadPic from "./uploadPic";
import 'braft-editor/dist/index.css'
import qs from "qs"
export default class FunLog extends React.Component {
    state = {
        status : 0, // 0 表示写作 1 表示 设置标题 背景 2表示上传成功
        logID : 0,
        logGroup: [],
        editorState: BraftEditor.createEditorState('<p>Hello!</p>'), // 设置编辑器初始内容
        outputHTML: '<p></p>'
    }

    finishComponent = {
        0: {
            classname: "log-loading",
            icon: "loading",
            text: "上传中...",
            button: <div/>
        },
        1: {
            classname: "log-success",
            icon: "smile",
            text: "上传成功！", 
            button: <Button type="primary" key="onemore"  style={{width: "45%"}} onClick={this.handleEditor(0)}>再来一篇</Button>
        },
        2: {
            classname: "log-fail",
            icon: "frown",
            text: "出错啦！",
            button : <Button type="primary" key="reback"  style={{width: "45%"}} onClick={this.handleEditor(0)}>返回日志</Button>
        }
    }
    
    componentWillMount(){
        const success = res => this.setState({logGroup: res.data || []});
        AjaxGetRequest(URLMAPCODE.GET_LOG_GROUP, {}, success)
    }

    getPrepareComponent(){
        const logGroup = this.state.logGroup;
        const Component = <div className="pre-component">
                <h3>日志标题</h3>
                <Input addonBefore={<Icon type="smile" />} placeholder="title" onChange={this.handleTitle.bind(this)}/>
                <h3>日志分组</h3>
                <AutoComplete 
                    style={{ width: "100%"}} 
                    dataSource={logGroup} 
                    onSelect={this.handleGroup.bind(this)} 
                    onSearch={this.handleGroup.bind(this)} 
                    placeholder="分组不存在将新建"
                />
                <h3>日志封面</h3>
                <UploadPic respone={this.handleUploadPic.bind(this)}/>
                <h3>日志操作</h3>
                <Button type="primary" key="left"  style={{width: "45%"}} onClick={this.handleEditor(0)}>返回修改</Button>
                <Button type="primary" key="right" style={{width: "45%", marginLeft: "10%"}} onClick={this.handleEditor(2)}>提交上传</Button>
            <div className="preview">
            </div>
        </div>
        return Component;
    }

    getFinishComponent(){
        const load = this.state.load || 0;
        const component = this.finishComponent[load];
        const classname = "log-upload " + component.classname;

        return <div className={classname}>
            <img src={require("../../../images/home/led-long-2.png")} alt="loading"></img>
            <div className="text">
                <Icon type={component.icon} />
                {component.text}
            </div>
            {component.button}
            {/* <Button type="primary" key="load"  style={{width: "90%", marginLeft: "5%"}} onClick={this.changeLoad}>返回修改</Button> */}
        </div>;
    }

    changeLoad = () => {
        const load = ((this.state.load || 0) + 1 ) % 3;
        this.setState({load});
    }
    // 即将上传日志
    handleEditor(status){
        if(status === 2){
            return () => {
                const {title, group, imgName} = this.state;
                const content = this.state.editorState.toHTML();
                const master = GetCookie("username") || "zzh";
                const date = new Date();
                const model = {
                    day: date.toLocaleDateString(),
                    time: date.getHours() + ":" + date.getMinutes(),
                    like: 0,
                    read: 0,
                    comment: 0,
                }
                if(!title){
                    message.warning('未输入标题！');
                }else if(!group){
                    message.warning('未输入分组！');
                }else if(!imgName){
                    message.warning('未选择日志封面！');
                }else{
                    this.setState({load:0});
                    const success = res => this.setState({load: 1});
                    const fail = err => {this.setState({load: 2})};
                    AjaxPostRequest(URLMAPCODE.APPEND_LOG,qs.stringify({
                        title, group, imgName, content, master, ...model
                    }), success, fail);
                    this.setState({status})
                };
            }
        }
        return () => {
            this.setState({status});
        }
    }

    handleInput = (editorState) => {
        this.setState({editorState})
    }

    handleUploadPic(imgName){
        this.setState({imgName});
    }

    handleTitle(e){
        this.setState({title: e.target.value});
    }

    handleGroup(group){
        this.setState({group})
    }

    handleUpload = (filename) => {
        this.setState({
            editorState: ContentUtils.insertMedias(this.state.editorState, [{
              type: 'IMAGE',
              url: server + "/pic/" + filename,
            }])
        })
    }
    uploadHandler = (param) => {
        if (!param.file) {
          return false
        }
        else{
            transformFileToDataUrl(param.file, this.handleUpload);
        }   
    }

  render () {

    const controls = [
      'headings', 'text-color', 'text-align', 'list-ul', 'separator', 'link', 'emoji', 'code', 'undo', 'redo', 'remove-styles'
    ]
    const extendControls = [
        {
            key: 'custom-button',
            type: 'button',
            text: '下一步',
            onClick: this.handleEditor(1)
        },
        {
          key: 'antd-uploader',
          type: 'component',
          component: (
            <Upload
              accept="image/*"
              showUploadList={false}
              customRequest={this.uploadHandler}
            >
              <button type="button" className="control-item button upload-button" data-title="插入图片">
                <Icon type="picture" theme="filled" />
              </button>
            </Upload>
          )
        },
      ]
    const { editorState } = this.state
    const status = this.state.status;
    const preComponent = this.getPrepareComponent();
    return (
      <div className="fun-log-container">
        <div className="editor-tabs">
            <div className="tab" key="1" style={{left: - (status * 100 ) + "%"}}>
                <BraftEditor
                    value={editorState}
                    controls={controls}
                    contentStyle={{height: "600px", boxShadow: 'inset 0 1px 3px rgba(0,0,0,.1)'}}
                    onChange={this.handleInput}
                    extendControls={extendControls}
                />
            </div>
            <div className="tab" key="2" style={{left: ((1 - status) * 100 ) + "%"}}>
                {preComponent}
            </div>
            <div className="tab" key="3" style={{left: ((2 - status) * 100 ) + "%"}}>
                {this.getFinishComponent()}
            </div>
        </div>
      </div>
    )

  }

}