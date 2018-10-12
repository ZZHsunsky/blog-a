import React from 'react'
import UploadLog from './uploadlog'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class Manage extends React.Component{ 
      render() {
        return (
          <div style={{padding:"30px 30px",height:"100%",background:"#a6cde2"}}>
            <UploadLog></UploadLog>
          </div>
        );
      }
}