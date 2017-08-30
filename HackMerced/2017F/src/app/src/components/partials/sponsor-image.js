import React, { Component } from 'react'

export class SponsorImage extends Component {
  _onClick(){
    const { url } = this.props;
    window.open(url, '_blank');
  }

  render(){
    const { image, backgroundSize } = this.props;
    const imageLocation = `https://s3-us-west-1.amazonaws.com/hackmerced/sponsors/${image}_logo.png`;
    return (
      <div className='sponsor-image__container'>
        <div className='sponsor-image' onClick={this._onClick.bind(this)} style={
          {
            backgroundImage: 'url(' + imageLocation + ')',
            backgroundSize: backgroundSize
          }
        }>
        </div>
      </div>
    )
  }
}
