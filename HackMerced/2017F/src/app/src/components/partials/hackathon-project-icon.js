import React, { Component } from 'react'

export class HackathonProjectIcon extends Component {
  _onClick(){
    const { url } = this.props;
    window.open(url, '_blank');
  }

  render(){
    const { image, backgroundColor, backgroundSize, name } = this.props;
    const imageLocation = require(`../assets/hackathon-projects/${image}.png`);
    return (
      <div className='hackathon-project-icon__container'>
        <div className='hackathon-project-icon' name={name} onClick={this._onClick.bind(this)} style={
          {
            backgroundImage: 'url(' + imageLocation + ')',
            backgroundColor: backgroundColor,
            backgroundSize: backgroundSize
          }
        }>
        </div>
      </div>
    )
  }
}
