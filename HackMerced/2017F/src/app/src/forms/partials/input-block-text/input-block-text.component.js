import React, { Component } from 'react'

export class TextInputBlock extends Component{
  constructor(props){
    super(props)

    this.props = props;
  }

  _setParentFocused(e){
    console.log(e)
    e.target.parentNode.parentNode.classList.add('input-block--focused')
  }

  _setParentBlur(e){
    e.target.parentNode.parentNode.classList.remove('input-block--focused')
  }

  render(){
    return (
      <div className='input-block__container'>
        <div className='input-block'>
          <label>{this.props.label}</label>
          <div className='input-block__content'>
            <input onFocus={this._setParentFocused} onBlur={this._setParentBlur} type={this.props.type ? this.props.type : 'text'} placeholder={this.props.placeholder}></input>
          </div>
        </div>
        {(this.props.helper) ? (
          <div className='input-block__helper'>
            {this.props.helper}
          </div>
        ) : ''}
      </div>
    )
  }
}
