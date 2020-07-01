import React, { Component } from 'react';
import HowWeWorkContent from './how-we-work-content';
import { MainMenuSelectedKeys } from '../../constants';
import { Page } from '../page';

export default class HowWeWorkPage extends Component {

  state = { content: new HowWeWorkContent() }

  render() {
    MainMenuSelectedKeys.length = 0;
    MainMenuSelectedKeys.push(this.state.content.slug);
    return <Page rootPageLabel={this.state.content.name}>
      <h1>{this.state.content.title}</h1>
      <div>{this.state.content.description}</div>
    </Page>
  }
}