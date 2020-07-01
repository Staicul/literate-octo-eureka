import React, { Component } from 'react';
import FooterContent from './footer-content';

export default class Footer extends Component {

    footerRows = new FooterContent().footerRows;

    render() {
        return (
            <div>
                {this.footerRows.map((row, index) => <div className="footer-content" key={index}> {row} </div>)}
            </div>
        )
    }
}  