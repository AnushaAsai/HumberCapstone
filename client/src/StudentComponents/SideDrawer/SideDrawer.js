import React, { Component } from 'react'
import {
    NavLink
} from "react-router-dom";
import './SideDrawer.css'

export default class SideDrawer extends Component {
    state = {
        homeLink: "StudentList"
    }
    render() {
        let drawerClass = 'side-drawer';
        if (this.props.showSideDrawer) {
            drawerClass = 'side-drawer open';
        }
        return (
            <nav className={drawerClass}>
                <div>
                    <div className="logo">
                        <img src="http://humber.ca/cfe/sites/default/files/cfe-logo-white.png" alt="Logo" />
                    </div>
                    <ul>
                        <NavLink exact to="/dashboard" activeStyle={{ backgroundColor: 'white', color: 'rgb(2, 65, 202)' }}><li>Home</li></NavLink>
                        <NavLink exact to="/profile" activeStyle={{ backgroundColor: 'white', color: 'rgb(2, 65, 202)' }}><li>Profile</li></NavLink>
                    </ul>
                </div>
            </nav>
        )
    }
}
