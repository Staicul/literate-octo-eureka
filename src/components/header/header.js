import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { LocalizationContext } from 'localize-react';

import HeaderContent from './header-content';
import Logo from './logo';

export default class Header extends Component {

    menuItems = new HeaderContent().navLinks;

    render() {
        return (
            <div>
                <Logo />
                <div className="menu">
                    {this.menuItems.map((menuItem, index) => <Link key={index} to={menuItem.link}> {this.context.translate(menuItem.title)} </Link>)}
                </div>
            </div>
        )
    }
}

Header.contextType = LocalizationContext;