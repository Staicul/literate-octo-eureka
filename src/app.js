import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/home/home-page';
import Vr360Page from './components/360/vr360-page';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import ContactPage from './components/contact/contact-page';
import WhatWeDoPage from './components/what-we-do/what-we-do-page';
import OurVisionPage from './components/vision/our-vision-page';
import HowWeWorkPage from './components/how-we-work/how-we-work-page';


export default class App extends Component {

  state = { title: "App title" };

  componentDidMount = () => {
    // todo
  };

  render() {
    // const { title } = this.state;
    return (
      <Router>
        <section>
          <section className="header">
            <Header />
          </section>
          <section className="content">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/360" component={Vr360Page} />
            <Route exact path="/contact" component={ContactPage} />
            <Route exact path="/how-we-work" component={HowWeWorkPage} />
            <Route exact path="/our-vision" component={OurVisionPage} />
            <Route exact path="/what-we-do" component={WhatWeDoPage} />
          </section>
          <section className="footer">
            <Footer />
          </section>
        </section>
      </Router>
    );
  }
}
