import React, { Component } from 'react';
import { Page } from '../page';
import { MainMenuSelectedKeys } from '../../constants';
import HomeContent from './home-content';

export default class HomePage extends Component {
  state = { content: new HomeContent()}

  render() {
    MainMenuSelectedKeys.length = 0;
    MainMenuSelectedKeys.push(this.state.content.slug);
    return (
      <Page rootPageLabel={this.state.content.name}>
        <h1>{this.state.content.title}</h1>
        <div>{this.state.content.description}</div>
      </Page>
    );
  }
}
