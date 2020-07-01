import React, { Component } from 'react';
import ContactContent from './contact-content';
import { MainMenuSelectedKeys } from '../../constants';
import { Page } from '../page';

export default class ContactPage extends Component {

  state = { content: new ContactContent() }

  render() {
    MainMenuSelectedKeys.length = 0;
    MainMenuSelectedKeys.push(this.state.content.slug);
    return <Page rootPageLabel={this.state.content.name}>
      <h1>{this.state.content.title}</h1>
      <div>{this.state.content.description}</div>
    </Page>
  }
}