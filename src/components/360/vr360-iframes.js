import React, { Component } from 'react';

export default class Vr360Iframes extends Component {


  render() {
    const {content} = this.props;
    return (
      <div>360 iframes: {content.iframes.map((f,i) => <div key={i}>{f.title}</div>)}</div>
    );
  }

}
