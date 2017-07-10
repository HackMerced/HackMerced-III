import React, { Component } from 'react'

export class TextInputBlock extends Component{
  constructor(props){
    super(props)
    this.props = props;
  }

  _pushEmoji(error, emoji){
    if(!emoji && !error){
      return;
    } else {
      return (<div className='input-block__emoji'>{emoji || '😡'}</div>)
    }
  }
  _setParentFocused(e){
    e.target.parentNode.parentNode.classList.add('input-block--focused')
  }

  _setParentBlur(e){
    e.target.parentNode.parentNode.classList.remove('input-block--focused')
  }


  render(){
    return (
      <div className='input-block__container'>
        <div className={'input-block' + ((this.props.error) ? ' input-block--error' : '')}>
          <label>{this.props.label}</label>
          <div className='input-block__content' >
            <input onChange={this._removeErrors} onFocus={this._setParentFocused} onChange={this.props.onChange} name={this.props.name} onBlur={this._setParentBlur} type={this.props.type ? this.props.type : 'text'} placeholder={this.props.placeholder}></input>
            {this._pushEmoji(this.props.error, this.props.emoji)}
          </div>
        </div>
        {(this.props.error) ? (
          <div className='input-block__error'>
            {this.props.error}
          </div>
        ) : ''}
        {(this.props.helper) ? (
          <div className='input-block__helper'>
            {this.props.helper}
          </div>
        ) : ''}

      </div>
    )
  }
}
