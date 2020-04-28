import React, { Component } from 'react'
import './Registration.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class Registration extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit.bind(this);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
            confirmPassword: "",
            errorMessage: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /*handleInputChange(event) {
        const target = event.target;
        const firstName = target.firstName;
        const lastName = target.lastName;
        const email = target.email;
        const phone = target.phone;
        const password = target.password;
        const confirmPassword = target.confirmPassword;

        this.setState({
          firstName : firstName,
          lastName : lastName,
          email: email,
          password:password,
          confirmPassword:confirmPassword,
          phone:phone
        });
      }*/
    handleInputChange(event) {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    handleSubmit = event => {
        event.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            phone: this.state.phone
        };
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        if (this.state.password !== this.state.confirmPassword) {
            alert("Passwords don't match");
        } else {
        axios.post('/api/students', data, {config})
            .then(response => {
                this.props.history.push("/dashboard")
            })
            .catch(error => {
                //console.log(error.response.data.errors[0].msg);
            });
        }

    }
    render() {
        var styles = { color: 'red' }
        var emailError, passwordError, fnameError, lnameError, phoneError,alreadyExists;
            this.state.errorMessage.map(e => {
                if (e.param === 'email')
                    emailError = e.msg;
                if (e.param === 'password')
                    passwordError = e.msg;
                if (e.param === 'firstname')
                    fnameError = e.msg;
                if (e.param === 'lastname')
                    lnameError = e.msg;
                if (e.param === 'phone')
                    phoneError = e.msg;
                if (e.param === 'alreadyExists')
                    alreadyExists = e.msg;
            })
        return (
            <div className="register-main-div">
                <p>.</p>
                <div className="register-div container-fluid">
                    <div className="register-logo ">
                        <img src="Humber_Centre-for-Entrepreneurship_blue-gold.gif" className="register-logo" alt="Logo" />
                    </div>
                    <h4 className="register-title">Create your Account</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="col-5">
                                <label>First Name: </label>
                                <input type="text" className="form-control register-input" name="firstName" placeholder="First Name" onChange={this.handleInputChange}
                                />
                                {<p style={styles}>{fnameError}</p>}
                            </div>
                            <div className="col-5">
                                <label>Last Name:</label>
                                <input type="text" className="form-control register-input" name="lastName" placeholder="Last Name" onChange={this.handleInputChange}
                                />
                                {<p style={styles}>{lnameError}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label>Email:</label>
                                <input type="email" className="form-control register-input" name="email" placeholder="Enter your email" onChange={this.handleInputChange}
                                />
                                {<p style={styles}>{emailError}</p>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>Phone:</label>
                                <input type="tel" className="form-control register-phone register-input" name="phone" placeholder="Enter your Phone" onChange={this.handleInputChange}
                                />
                                {<p style={styles}>{phoneError}</p>}
                            </div>
                        </div>

                        <div className="row">
                            <div className=" col-6 pass">
                                <label>Password:</label>
                                <input type="password" className="form-control pass register-input" name="password" placeholder="Enter your Password" onChange={this.handleInputChange}
                                />
                                {<p style={styles}>{passwordError}</p>}
                            </div>
                            <div className="col-6 pass">
                                <label>Confirm Password:</label>
                                <input type="password" className="form-control pass register-input" name="confirmPassword" placeholder="Enter your Password" onChange={this.handleInputChange}
                                />
                            </div>
                        </div>
                        {<p style={styles}>{alreadyExists}</p>}
                        <div className="row register-login">
                            <div className="col">
                                <div className="">
                                    <p>Already Have an Account? <a className="fp" href="/">Login</a></p>
                                </div>
                            </div>
                            <div className="col">
                                <input type="submit" value="Register" className="btn btn-primary btn-register" />
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}
export default withRouter(Registration);