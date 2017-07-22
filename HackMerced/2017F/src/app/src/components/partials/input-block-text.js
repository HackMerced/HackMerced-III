import React, { Component } from 'react'
import { InputOptions, InputFileUpload } from './'

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

  _updateRelativeInput(event){
    const { name, option } = event.target.dataset;
    this.props.onChange({
      target:{
        name: name,
        value: option
      }
    })
  }

  render(){
    const inputOverlayMap = {
      'options' : ( <InputOptions
                      updateRelativeInput={this._updateRelativeInput.bind(this)}
                      options={this.props.options}
                      current={this.props.value}
                      optionsType={this.props.optionsType}
                      name={this.props.name}/>),
      'fileupload' : ( <InputFileUpload
                          updateRelativeInput={this._updateRelativeInput.bind(this)}
                          name={this.props.name}/>)
    }

    const { labelType = 'small', type = 'text' } = this.props;

    const inputOverlay = inputOverlayMap[type] || false;
    return (
      <div className={ 'input-block__container input-block__container--' + labelType + '-label'  }>
        <div className={'input-block' + ((this.props.error) ? ' input-block--error' : '')}>
          <label>{this.props.label}</label>
          <div className='input-block__content' >
            {(inputOverlay) ? inputOverlay : '' }
            <input
              hidden={(inputOverlay) ? 'hidden' : ''}
              onFocus={this._setParentFocused}
              spellCheck={this.props.spellCheck}
              autoCorrect={this.props.autoCorrect}
              autoCapitalize={this.props.autoCapitalize}
              value={this.props.value}
              onChange={this.props.onChange}
              name={this.props.name}
              id={this.props.name}
              onBlur={this._setParentBlur}
              type={type}
              autoComplete={this.props.autoComplete}
              placeholder={this.props.placeholder}
            />
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
