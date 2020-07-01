import React, { Component } from 'react';
import OurVisionContent from './our-vision-content';
import { MainMenuSelectedKeys } from '../../constants';
import { Page } from '../page';

export default class OurVisionPage extends Component {

  state = { content: new OurVisionContent() }

  render() {
    MainMenuSelectedKeys.length = 0;
    MainMenuSelectedKeys.push(this.state.content.slug);
    return <Page rootPageLabel={this.state.content.name}>
      <h1>{this.state.content.title}</h1>
      <div>{this.state.content.description}</div>
    </Page>
  }
}