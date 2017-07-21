import React, { Component } from 'react'

export class InputFileUpload extends Component{


  _onClick(event){
    event.preventDefault();

    const { name, updateRelativeInput } = this.props;

    let client = filestack.init(process.env.FILESTACK_API_KEY);

    client.pick({
      maxFiles: 1,
      minFiles: 1,
      fromSources: ['local_file_system','googledrive', 'dropbox', 'box', 'url']
    }).then(function(result) {

      const source = (result.filesUploaded && result.filesUploaded[0] && result.filesUploaded[0].url) ? result.filesUploaded[0].url : '';

      updateRelativeInput({
        target: {
          dataset: {
            name: name,
            option: source,
          }
        }
      })
    })


  }

  render(){
    return (
      <div className='input-block__file-upload' onClick={this._onClick.bind(this)}></div>
    )
  }
}
