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
import Language from './components/language'
import { LocalizationProvider } from 'localize-react';
import { TRANSLATIONS, IS_LOCALIZE_CACHE_DISABLED } from './constants'

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: "App title",
      language: "EN"
    };

    this.changeLanguage = this.changeLanguage.bind(this)
  }

  componentDidMount = () => {
    // todo
  };


  changeLanguage(language) {
    // console.log(language)
    this.setState({
      language: language
    }, () => { console.log(this.state) })
  }

  render() {
    // const { title } = this.state;
    console.log(this.state.language)
    console.log("render app")
    return (
      <LocalizationProvider
        disableCache={IS_LOCALIZE_CACHE_DISABLED}
        locale={this.state.language}
        translations={TRANSLATIONS}
      >
        <Router>
          <section>
            <section className="header">
              {/* {console.log(this.state.language)} */}
              <Header />
            </section>
            <section className="content">
              <Route exact path="/" component={HomePage} />
              <Route exact path="/360" component={Vr360Page} />
              <Route exact path="/contact" component={ContactPage} />
              <Route exact path="/how-we-work" component={HowWeWorkPage} />
              <Route exact path="/our-vision" component={OurVisionPage} />
              <Route exact path="/what-we-do" component={WhatWeDoPage} />
              <Language changeLanguage={this.changeLanguage} />
            </section>
            <section className="footer">
              <Footer />
            </section>
          </section>
        </Router>
      </LocalizationProvider>
    );
  }
}
