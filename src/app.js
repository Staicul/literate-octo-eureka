import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import HomePage from './components/home/home-page';
import Vr360Page from './components/360/vr360-page';


export default class App extends Component {

  state = { title: "App title" };

  componentDidMount = () => {
    // todo
  };

  render() {
    const { title } = this.state;
    return (
        <Router>
          <section>
            <section className="header">
              <Link to="/">
                <div className="logo-heading">
                  <img src="/static/png/logo.png" alt={'test'}/>
                  <div>{title}</div>
                </div>
              </Link>
              <div className='menu'>
                <Link to="/">Home</Link>
                <Link to="/360">360</Link>
              </div>
            </section>
            <section className="content">
              <Route exact path="/" component={HomePage} />
              <Route exact path="/360" component={Vr360Page} />
            </section>
          </section>
        </Router>
    );
  }
}
