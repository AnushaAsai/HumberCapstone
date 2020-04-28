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
        let drawerClass = 'side-drawer-judge';
        if (this.props.showSideDrawer) {
            drawerClass = 'side-drawer-judge open';
        }
        return (
            <nav className={drawerClass}>
                <div>

                    <div className="admin-logo">
                        <img src="http://humber.ca/cfe/sites/default/files/cfe-logo-white.png" alt="Logo" />
                    </div>
                    <ul>

                        <NavLink exact to="/judge/dashboard" activeStyle={{ backgroundColor: 'white', color: 'rgb(4, 124, 0)' }}><li>Home</li></NavLink>
                        <NavLink exact to="/judge/profile" activeStyle={{ backgroundColor: 'white', color: 'rgb(4, 124, 0)' }}><li>Profile</li></NavLink>
                        {/* <NavLink exact to="/judge/studentlist" activeStyle={{ backgroundColor: 'white', color: 'rgb(4, 124, 0)' }}><li>Students</li></NavLink> */}
                    </ul>

                </div>
            </nav>
        )
    }
}
