import React from 'React'
import { Steps, Button, message } from 'antd';
import './uploadlog.less'
import {EditorState,convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import axios from 'axios'

const Step = Steps.Step;

export default class UpLoadlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };

    this.steps = [{
      title: 'First',
      content: <MyEditor></MyEditor>
    }, {
      title: 'Second',
      content: 'Second-content',
    }, {
      title: 'Last',
      content: 'Last-content',
    }];
  }

  uploadClick(){
    var data = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    axios.post('http://localhost:8081/uplog',{
        data:data,
    }).then( (res) => {
        console.log(res);
    }).catch( (error) => {
        console.log(error);
    })
}

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <div className="upload-log-steps">
        <Steps current={current}>
          {this.steps.map(item => <Step key={item.title} title={item.title}>{item.content}</Step>)}
        </Steps>
        <div className="steps-content">{this.steps[current].content}</div>
        <div className="steps-action">
          {
            current < this.steps.length - 1
            && <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            current === this.steps.length - 1
            && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            current > 0
            && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
            )
          }
        </div>
      </div>
    );
  }
}

class MyEditor extends React.Component{
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

class SelectLogTags extends React.Component{
  render(){
    return <div>
      
    </div>
  }
}
