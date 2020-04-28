import React, { Component } from 'react';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/AdminSideDrawer';
import BackDrop from './BackDrop/BackDrop'
import './AdminDashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import StudentList from './StudentList/StudentList';
import Profile from './Profile/Profile';
import CompetitionList from './CompetitionList/CompetitionList';
import JudgeList from './JudgeList/JudgeList';
import AdminList from './AdminList/AdminList';
import AddCompetition from './AddCompetition/AddCompetition';
import EditCompetition from './EditCompetition/EditCompetition';
import CompetitionDetails from './CompetitionList/CompetitionDetails';
import StudentsEnrolled from './StudentList/StudentsEnrolled'
import SendEmail from './SendEmail/SendEmail';
import EmailContent from './SendEmail/EmailContent';
import AddJudge from './JudgeList/AddJudge';
import AddAdmin from './AdminList/AddAdmin';
import EditProfile from './Profile/EditProfile';
import Scores from './Scores/Scores';
import AddSurvey from './AddCompetition/AddSurvey';
import EditSurvey from './EditCompetition/EditSurvey';
import CompetitionListScores from './Scores/CompetitionListScores';
// import { Container } from 'react-bootstrap/lib/Tab';
class AdminDashboard extends Component {
  constructor(props){
    super(props);
     
    this.changeLocation = this.changeLocation.bind(this);
    if(localStorage.getItem('adminToken')==null){
      props.history.push("/admin")
  }
  }
state = {
    SideDrawerOpen: false,
    title:"Home"
  }
  // static propTypes = {
  //   location: React.PropTypes.object.isRequired
  // }
  drawerToggleHandler = ()=>{
  this.setState((prevState)=>{
    return {SideDrawerOpen: !prevState.SideDrawerOpen}
  });
};
  backdropClickHandler = ()=>{
    this.setState({SideDrawerOpen: false});
};
componentDidUpdate(prevProps){
  if (this.props.location !== prevProps.location) {
    this.changeLocation(this.props.location)
  }
}
changeLocation(location){
  this.setState({title:location})
}
render() {
  let backDrop;
  if(this.state.SideDrawerOpen){
    backDrop = <BackDrop dropClicked={this.backdropClickHandler}/>
  }
  return (
    <div className="App">
      
      <SideDrawer showSideDrawer={this.state.SideDrawerOpen}/>
      {backDrop}
      <Toolbar drawerClickHandler={this.drawerToggleHandler} SidebarOpen={this.state.SideDrawerOpen} title1={this.state.title}/>
      <main className="admin-main">
          <div>
            <BrowserRouter>
            <Switch>
          <Route exact path="/admin/dashboard" render={()=><CompetitionList onchangeLocation={this.changeLocation}/>}/>
          <Route path="/admin/competitionDetails/:comp_id" component={CompetitionDetails} />
          <Route exact path="/admin/studentlist" render={()=><StudentList onchangeLocation={this.changeLocation}/>}/>
          <Route exact path="/admin/studentlist/:comp_id" component={StudentsEnrolled}/>
          <Route exact path="/admin/profile" render={()=><Profile onchangeLocation={this.changeLocation}/>}/>
          <Route exact path="/admin/profile/editprofile" render={()=><EditProfile onchangeLocation={this.changeLocation}/>}/>
          <Route exact path="/admin/judgelist" render={()=><JudgeList onchangeLocation={this.changeLocation}/>}/>
          <Route exact path="/admin/adminlist" render={()=><AdminList onchangeLocation={this.changeLocation}/>}/>
          <Route exact path="/admin/addcompetition" render={()=><AddCompetition onchangeLocation={this.changeLocation}/>} />
          <Route path="/admin/addcompetition" component={AddCompetition} />
          <Route path="/admin/editcompetition/:comp_id" component={EditCompetition} />
          <Route exact path="/admin/addsurvey/:comp_id" render={()=><AddSurvey onchangeLocation={this.changeLocation}/>} />
          <Route exact path="/admin/editsurvey/:comp_id" render={()=><EditSurvey onchangeLocation={this.changeLocation}/>} />
          <Route exact path="/admin/emails" render={()=><SendEmail onchangeLocation={this.changeLocation}/>} />
          <Route exact path="/admin/emailContent/:comp_id" component= {EmailContent} />
          <Route exact path="/admin/addjudge" render={()=><AddJudge/>} />
          <Route exact path="/admin/addadmin" render={()=><AddAdmin/>} />
          <Route exact path="/admin/scores" render={CompetitionListScores} />
          <Route exact path="/admin/finalizeScores/:competition_id" component={Scores} />
         </Switch>
         </BrowserRouter>
          </div>
      </main>
    </div>
  );
}
}
export default AdminDashboard;
