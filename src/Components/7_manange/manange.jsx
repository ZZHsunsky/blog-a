import React from 'react'
import UploadLog from './uploadlog'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class Manage extends React.Component{
   
      
      
      render() {
        return (
          <div style={{margin:"30px 30px"}}>
            <UploadLog></UploadLog>
          </div>
        );
      }
}