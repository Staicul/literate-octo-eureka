import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { LocalizationContext } from 'localize-react';

import HeaderContent from './header-content';

export default class Header extends Component {

    menuItems = new HeaderContent().navLinks;
    render() {
        console.log("render header")
        return (
            <div>
                <div className="menu">
                    {this.menuItems.map((menuItem, index) => <Link key={index} to={menuItem.link}> {this.context.translate(menuItem.title)} </Link>)}
                </div>
            </div>
        )
    }
}

Header.contextType = LocalizationContext;