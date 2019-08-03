import React, { Component } from 'react';

import './FloatingButton.css';

class FloatingButton extends Component {
  render() {
    return (
        <button className="badge badge-pill badge-success btn-new"><i className="fas fa-plus"></i></button>
    );
  }
}

export default FloatingButton;