import React, { Component } from 'react';

export default class Language extends Component {

    render() {
        return (
            <div>
                <div className="flag-container">
                    <img onClick={() => this.props.changeLanguage("RO")} src="/static/svg/ro.svg" alt={'romana'} />
                    <img onClick={() => this.props.changeLanguage("EN")} src="/static/svg/gb.svg" alt={'english'} />
                </div>
            </div>
        )
    }
}