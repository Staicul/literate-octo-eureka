import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Logo extends Component {

    render() {
        return (
            <Link to="/">
                <div className="logo-heading">
                    <img src="/static/png/logo.png" alt={'test'} />
                </div>
            </Link>
        )
    }
}


