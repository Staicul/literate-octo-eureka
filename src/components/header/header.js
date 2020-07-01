import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import HeaderContent from './header-content';
import Logo from './logo'

export default class Header extends Component {

    menuItems = new HeaderContent().NAV_LINKS;

    render() {
        return (
            <div>
                <Logo />
                <div className="menu">
                    {this.menuItems.map((menuItem, index) => <Link key={index} to={menuItem.link}> {menuItem.title} </Link>)}
                </div>
            </div>
        )
    }
}  