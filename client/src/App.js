import React, { Component } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from './components/AdminDashboard';
import JudgeDashboard from './Judgecomponents/JudgeDashboard';
import StudentDashboard from './StudentComponents/StudentDashboard';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './StudentComponents/Login/Login';
import Registration from './StudentComponents/Login/Registration'
import AdminLogin from './components/Login/AdminLogin';
import JudgeLogin from './Judgecomponents/Login/JudgeLogin';
import ForgotPassword from './StudentComponents/Login/ForgotPassword';
import AdminForgotPassword from './components/Login/AdminForgotPassword'
import JudgeForgotPassword from './Judgecomponents/Login/JudgeForgotPassword'
import Logout from './StudentComponents/Toolbar/Logout';
// import NotFoundPage from './components/NotFoundPage'
class App extends Component {
  render() {
    return (
      
      <BrowserRouter>
        {/* Login Router */}
        <Route exact path={"/"} render={props => (
          <Login />
        )} />
        <Route exact path={"/forgotpassword"} render={props => (
          <ForgotPassword />
        )} />
        <Route exact path={"/logout"} render={props => (
          <Logout/>
        )} />
        <Route exact path={"/admin"} render={props => (
          <AdminLogin />
        )} />
        <Route exact path={"/admin/forgotpassword"} render={props => (
          <AdminForgotPassword />
        )} />

        <Route exact path={"/judge"} render={props => (
          <JudgeLogin />
        )} />
        <Route exact path={"/judge/forgotpassword"} render={props => (
          <JudgeForgotPassword />
        )} />

        <Route exact path={"/registration"} render={props => (
          <Registration />
        )} />

        {/* admin routes  */}
        
        <Route exact path={"/admin/dashboard"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path={"/admin/addcompetition"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path={"/admin/editcompetition/:comp_id"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path={"/admin/addsurvey/:comp_id"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path={"/admin/editsurvey/:comp_id"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path={"/admin/competitionDetails/:comp_id"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path={"/admin/profile"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path={"/admin/profile/editprofile"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path={"/admin/adminlist"} render={props => (
          <AdminDashboard/>
        )}/>
        <Route exact path={"/admin/studentlist"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path={"/admin/judgelist"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path={"/admin/emails"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path="/admin/emailContent/:comp_id" render={(props)=><AdminDashboard {...props}/>} />
        <Route exact path={"/admin/addjudge"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path={"/admin/addadmin"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path={"/admin/scores"} render={props => (
          <AdminDashboard {...props}/>
        )}/>
        <Route exact path={"/admin/finalizeScores/:id"} render={props => (
          <AdminDashboard {...props}/>
        )}/>

        {/* Judge routes */}
        <Route exact path={"/judge/dashboard"} render={props => (
          <JudgeDashboard />
        )} />
        <Route exact path={"/judge/studentlist"} render={props => (
          <JudgeDashboard />
        )} />
        <Route exact path={"/judge/profile"} render={props => (
          <JudgeDashboard />
        )} />
        <Route exact path={"/judge/showsurvey/:stu_id"} render={props => (
          <JudgeDashboard />
        )} />

        {/* Student Routers */}
        <Route exact path={"/dashboard"} render={props => (
          <StudentDashboard />
        )} />
        <Route exact path={"/competitiondetails/:comp_id"} render={props => (
          <StudentDashboard />
        )} />
        <Route exact path={"/profile"} render={props => (
          <StudentDashboard />
        )} />
        <Route exact path={"/survey/:comp_id"} render={props => (
          <StudentDashboard />
        )} />
      </BrowserRouter>
    )
  }
}
export default App;
