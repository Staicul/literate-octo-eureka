import React, { Component } from 'react';
import WhatWeDoContent from './what-we-do-content';
import { MainMenuSelectedKeys } from '../../constants';
import { Page } from '../page';

export default class WhatWeDoPage extends Component {

  state = { content: new WhatWeDoContent() }

  render() {
    MainMenuSelectedKeys.length = 0;
    MainMenuSelectedKeys.push(this.state.content.slug);
    return <Page rootPageLabel={this.state.content.name}>
      <h1>{this.state.content.title}</h1>
      <div>{this.state.content.description}</div>
    </Page>
  }
}