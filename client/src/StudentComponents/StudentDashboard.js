import React, { Component } from 'react';
import Toolbar from './Toolbar/Toolbar';
//import SideDrawer from './SideDrawer/SideDrawer';
import BackDrop from '../components/BackDrop/BackDrop'
import './StudentDashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import CompetitionList from './CompetitionList/CompetitionList';
import CompetitionDetails from './CompetitionList/CompetitionDetails';
import Survey from './CompetitionList/Survey';
import StudentProfile from './Profile/StudentProfile';
// import { Container } from 'react-bootstrap/lib/Tab';
class JudgeDashboard extends Component {
  constructor(props){
    super(props);
    if(localStorage.getItem('studentToken')==null){
      props.history.push("/")
    }
    this.changeLocation = this.changeLocation.bind(this);
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
      <BrowserRouter>
      {/* <SideDrawer showSideDrawer={this.state.SideDrawerOpen}/> */}
      {backDrop}
      <Toolbar drawerClickHandler={this.drawerToggleHandler} SidebarOpen={this.state.SideDrawerOpen} title1={this.state.title}/>
      <main className="student-main">
          <div>
            <Switch>
          <Route exact path="/dashboard" render={()=><CompetitionList onchangeLocation={this.changeLocation}/>}/>
          <Route exact path="/competitiondetails/:comp_id" component={CompetitionDetails}/>
          <Route exact path="/profile" render={()=><StudentProfile onchangeLocation={this.changeLocation}/>}/>
          <Route exact path="/survey/:comp_id" component={Survey}/>
          </Switch>
          </div>
      </main>
      </BrowserRouter>
    </div>
  );
}
}
export default JudgeDashboard;
