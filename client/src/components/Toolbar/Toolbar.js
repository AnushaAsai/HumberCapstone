import React, { Component } from 'react';
import './Toolbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import decode from 'jwt-decode';

export default class Toolbar extends Component{ 
    logout = event => {
        localStorage.removeItem('adminToken');
    }
    render(){
    return(
    <header className="toolbar-admin">
        <nav className="toolbar__navigation">
            <div className="toolbar__toggle-button">
                <button className="admin-toggle-button" onClick={this.props.drawerClickHandler}>
                <FontAwesomeIcon icon={faBars} color="white" className="bars"/>
                </button>
            </div>
            {/* <div className="toolbar__logo"><a href="/"><img src="http://humber.ca/cfe/sites/default/files/cfe-logo-white.png" alt="Logo"/></a></div> */}
    <div className="title"><h3>{this.props.title1}</h3></div>
            <div className="toolbar__navigation-items">
                <ul>
                    <li className="hide"><a href="/">Profile</a></li>
                    <li><a href="/admin" onClick={this.logout}>Logout</a></li>
                </ul>
            </div>
        </nav>
    </header>
)};
    }