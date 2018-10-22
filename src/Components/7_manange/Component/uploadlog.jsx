import React from 'React'
import './uploadlog.less'
import {EditorState,} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg'



export default class UpLoadlog extends React.Component {
  
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  state = {
    editorState: EditorState.createEmpty(),
    idx:0,
    class:[]
  }

  onStepClick = (idx) =>{
      return () =>{
        this.setState({idx:idx});
      }
  }
  render(){
    const  {editorState}  = this.state;
    const stepCont = [<Editor
      editorState={editorState}
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor"
      onEditorStateChange={this.onEditorStateChange}
    />, "haha",'wudi'];

    return <div className="upload">
      <div className="process-bar">
        <ul>
          <li className={this.state.idx > 0 ? "active":""} onClick={this.onStepClick(0)}><a id="step-one">1</a><div className="through"></div></li>
          <li className={this.state.idx > 1 ? "active":""} onClick={this.onStepClick(1)}><a id="step-two">2</a><div className="through"></div></li>
          <li onClick={this.onStepClick(2)}><a id="step-thr">3</a><div className="through"></div></li>
        </ul>
      </div>
      <div className={this.state.idx > 1 ? "process-card active":"process-card"}>
        {stepCont[this.state.idx]}
      </div>
    </div>
  }

  
}
