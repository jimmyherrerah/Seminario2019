import React, { Component } from 'react';

class Input extends Component {
  render() {
    return (
        <input
            type={this.props.inputType || 'text'}
            name={this.props.inputName || 'input' + Math.round(Math.random() * 100)}
            placeholder={this.props.inputPlaceholder || '' }
            />
    );
  }
}

export default Input;
