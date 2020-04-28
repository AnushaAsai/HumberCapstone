import React, { Component } from 'react';
import axios from 'axios';
// import Home from '../../Home'
import './Login.css';
import { withRouter } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: []
        };
        this.handleSubmit.bind(this);
    }
    updatePassword = event => {
        this.setState({
            password: event.target.value
        });
    }

    updateEmail = event => {
        this.setState({
            email: event.target.value
        });
    }
    handleSubmit = event => {
        event.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/api/login/student', data, config)
            .then(response => {
                console.log(response);
                //let decodeddata = decode(response.data.token); 
                localStorage.setItem('studentToken', response.data.token);
                this.props.history.push("/dashboard")
            })
            .catch(error => {
                console.log(error.response.data.errors);
                this.setState({ errorMessage: error.response.data.errors });
            });
    }
    render() {
        var styles = {color: 'red'}
        var emailError, passwordError, notFound;
        this.state.errorMessage.map(e => {
            if (e.param === 'email')
                emailError = e.msg;
            if (e.param === 'password')
                passwordError = e.msg;
            if (e.param === 'NotFound')
                notFound = e.msg;
        })
        return (
            <div className="main-container">
                <div className="container-fluid container-fluid-login align-self-end">
                    <div className="row">
                        <div className=" d-flex justify-content-center">
                            <img src="Humber_Centre-for-Entrepreneurship_blue-gold.gif" className="Logo" alt="Logo" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="lg-col-6 lg-col-6-login">
                            <h2>Sign in</h2><br />
                            <h5>with your email</h5>
                        </div>
                    </div>
                    <div className="row my-auto d-flex justify-content-center">
                        <div className="lg-col-12 lg-col-12-login">
                            <form className="form" onSubmit={this.handleSubmit}>
                                <div>
                                    <div className="form-group">
                                        <label><b>Email : </b></label><br />
                                        <input type="email" placeholder="Enter Your email" name="email" className="form-control" onChange={this.updateEmail} /><br />
                                        {<p style={styles}>{emailError}</p>}
                                    </div>
                                    <div className="form-group">
                                        <label><b>Password : </b></label><a className="fp" href="/forgotpassword">Forgot your password?</a><br />
                                        <input type="password" placeholder="Enter Your Password" name="pass" className="form-control" onChange={this.updatePassword} />
                                        {<p style={styles}>{passwordError}</p>}        
                                    </div>
                                    {<p style={styles}>{notFound}</p>}  
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-login btn-dark" value="Login" />
                                    </div>
                                </div>
                            </form>
                            <div className="regsiteration-div">
                                <p>Don't have Account Yet?</p>
                                <a className="fp1" href="/registration">Create New Account</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    };
}
export default withRouter(Login);