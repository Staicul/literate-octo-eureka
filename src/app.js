import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/home/home-page';
import Header from './components/header/header';
import Footer from './components/footer/footer';
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
