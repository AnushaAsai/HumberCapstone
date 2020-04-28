import React, { Component } from 'react'
import { NavLink
  } from "react-router-dom";
import './AdminSideDrawer.css'

export default class AdminSideDrawer extends Component {
    state={
        homeLink:"StudentList"
    }
    render() {
        let drawerClass = 'side-drawer-admin';
        if(this.props.showSideDrawer){
        drawerClass = 'side-drawer-admin open';
        }
        return (
            <nav className={drawerClass}>
                    <div>
                
                <div className="admin-logo">
                <img src="http://humber.ca/cfe/sites/default/files/cfe-logo-white.png" alt="Logo"/>
                </div>
                <ul>
                    
                <NavLink exact to="/admin/dashboard" activeStyle={{backgroundColor:'whitesmoke',color:'rgba(89, 28, 145, 1)',pointerEvents:"none"}}><li>Home</li></NavLink>
          <NavLink exact to="/admin/profile" activeStyle={{backgroundColor:'whitesmoke',color:'rgba(89, 28, 145, 1)',pointerEvents:"none"}}><li>Profile</li></NavLink>
          <NavLink exact to="/admin/studentlist" activeStyle={{backgroundColor:'whitesmoke',color:'rgba(89, 28, 145, 1)',pointerEvents:"none"}}><li>Students</li></NavLink>
          <NavLink exact to="/admin/judgelist" activeStyle={{backgroundColor:'whitesmoke',color:'rgba(89, 28, 145, 1)',pointerEvents:"none"}}><li>Judges</li></NavLink>
          <NavLink exact to="/admin/adminlist" activeStyle={{backgroundColor:'whitesmoke',color:'rgba(89, 28, 145, 1)',pointerEvents:"none"}}><li>Admin</li></NavLink>
          <NavLink exact to="/admin/emails" activeStyle={{backgroundColor:'whitesmoke',color:'rgba(89, 28, 145, 1)',pointerEvents:"none"}}><li>Send Mail</li></NavLink>
          <NavLink exact to="/admin/scores" activeStyle={{backgroundColor:'whitesmoke',color:'rgba(89, 28, 145, 1)',pointerEvents:"none"}}><li>Finalize Score</li></NavLink>
                </ul>

                </div>
            </nav>
        )
    }
}
