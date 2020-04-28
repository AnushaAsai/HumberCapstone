import React, { Component } from 'react';
import './Toolbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { NavDropdown } from 'react-bootstrap';
import decode from 'jwt-decode';

export default class Toolbar extends Component{ 
    state={
        myname:""
    };
    componentDidMount() {   
          let decodeddata = decode(localStorage.getItem('studentToken')); 
          this.setState({myname:decodeddata.student.firstname+ " "+decodeddata.student.lastname})
    }

    logout = event => {
        localStorage.removeItem('studentToken');
    }

    render(){
    return(
    <header className="toolbar">
        <nav className="toolbar__navigation">
            <div className="toolbar__toggle-button">
                <button className="toggle-button" onClick={this.props.drawerClickHandler}>
                <FontAwesomeIcon icon={faBars} color="white" className="bars"/>
                </button>
            </div>
            <div className="student-logo">
            <a href="/dashboard"><img src="http://humber.ca/cfe/sites/default/files/cfe-logo-white.png" className="stu-Logo" alt="Logo"/></a>
            </div>
            {/* <div className="toolbar__logo"><a href="/"><img src="http://humber.ca/cfe/sites/default/files/cfe-logo-white.png" alt="Logo"/></a></div> */}
    <div className="title"><h3>{this.props.title1}</h3></div>
    <NavDropdown title={this.state.myname} id="basic-nav-dropdown">
        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
        <NavDropdown.Item href="/mycompetition">My Competition</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="/" onClick={this.logout}> Logout</NavDropdown.Item>
      </NavDropdown>
        </nav>
    </header>
)};
    }