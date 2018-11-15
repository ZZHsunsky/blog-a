import React from 'react'
import {Input, Button, Icon, AutoComplete, message} from "antd";
import BraftEditor from 'braft-editor'
import UploadPic from "./uploadPic";
import axios from "axios"
import qs from "qs"
import 'braft-editor/dist/index.css'

export default class FunLog extends React.Component {
    state = {
        status : 1, // 0 表示写作 1 表示 设置标题 背景 2表示上传成功
        logID : 0,
        logGroup: [],
        editorState: BraftEditor.createEditorState('<p>Hello!</p>'), // 设置编辑器初始内容
        outputHTML: '<p></p>'
    }

    finishComponent = {
        0: <div>LOADING</div>,
        1: <div>SUCCESSFUL<Button type="primary" shape="circle" icon="right" onClick={this.handleEditor(1)}/></div>,
        2: <div>服务器错误<Button type="primary" shape="circle" icon="right" onClick={this.handleEditor(1)}/></div>
    }

    componentWillMount(){
        const self = this;
        axios.get("http://localhost:8900/getLogGroup").then( res =>{
            self.setState({logGroup: res.data || []});
        })
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
            <div className="preview">
            </div>
        </div>
        return Component;
    }

    getFinishComponent(){
        const load = this.state.load || 0;
        return this.finishComponent[load];
    }

    handleEditor(status){
        if(status == 2){
            return () => {
                const {title, group, imgName} = this.state;
                const content = this.state.editorState.toHTML()
                if(!title){
                    message.warning('未输入标题！');
                }else if(!group){
                    message.warning('未输入分组！');
                }else if(!imgName){
                    message.warning('未选择日志封面！');
                }else{
                    this.setState({load:0});
                    axios.post("http://localhost:8900/appendLog",qs.stringify({
                        title, group, imgName, content
                    })
                    ).then( res =>{
                            this.setState({load:1});
                        }
                    ).catch( err =>{
                        console.log(err);
                        this.setState({load:2});
                    })
                };
                this.setState({status})
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

  render () {

    const controls = [
      'bold','text-color', 'underline', 'list-ul', 'code', 'separator', 'link', 'separator', 'emoji', 'media'
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
                />
                <Button type="primary" shape="circle" icon="right" style={{right:"15px",position:"absolute"}} onClick={this.handleEditor(1)}/>
            </div>
            <div className="tab" key="2" style={{left: ((1 - status) * 100 ) + "%"}}>
                {preComponent}
                <Button type="primary" key="left" shape="circle" icon="left" style={{left:"15%",top:"200px",position:"absolute"}} onClick={this.handleEditor(0)}/>,
                <Button type="primary" key="right" shape="circle" icon="right" style={{right:"15%",top:"200px",position:"absolute"}} onClick={this.handleEditor(2)}/>,
            </div>
            <div className="tab" key="3" style={{left: ((2 - status) * 100 ) + "%"}}>
                {this.getFinishComponent()}
            </div>
        </div>
      </div>
    )

  }

}