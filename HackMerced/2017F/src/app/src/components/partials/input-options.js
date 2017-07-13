import React, { Component } from 'react'

export class InputOptions extends Component{
  _pushOptions(props){
    const { options, name, updateRelativeInput, current } = this.props;
    let optionElements = [];

    options.forEach((option, index) => {
      optionElements.push(
        <div onClick={updateRelativeInput}
              className={(current === option) ? 'input-block__options__item input-block__options__item--active' : 'input-block__options__item' }
              key={index}
              data-option={option}
              data-name={name} >{option}</div>);
    });

    return optionElements;
  }

  render(){
    const { optionsType = 'large' } = this.props;
    return (
      <div className={'input-block__options input-block__options--' + optionsType}>
        {this._pushOptions(this.props)}
        <div style={{clear:'both'}}></div>
      </div>
    )
  }
}
