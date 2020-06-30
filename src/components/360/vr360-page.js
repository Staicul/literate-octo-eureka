import React, { Component } from 'react';
import { Page } from '../page';
import Vr360Iframes from './vr360-iframes';
import { MainMenuSelectedKeys } from '../../constants';
import Vr360Content from './vr360-content';

export default class Vr360Page extends Component {

  state = {content: new Vr360Content()}

  render() {
    MainMenuSelectedKeys.length = 0;
    MainMenuSelectedKeys.push(this.state.content.slug);
    return <Page rootPageLabel={this.state.content.homeContent.name} breadCrumbs={[{ label: this.state.content.name , path:this.state.content.slug }]}>
      <h1>{this.state.content.title}</h1>
      <Vr360Iframes content={this.state.content}/>
    </Page>;
  }
}
