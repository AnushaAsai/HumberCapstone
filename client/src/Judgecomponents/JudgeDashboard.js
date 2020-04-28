import React, { Component } from 'react';
import Toolbar from './Toolbar/Toolbar';
import SideDrawer from './SideDrawer/SideDrawer';
import BackDrop from '../components/BackDrop/BackDrop'
import './JudgeDashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import StudentList from './StudentList/StudentList';
import CompetitionList from './CompetitionList/CompetitionList';
import JudgeProfile from './Profile/JudgeProfile';
import JudgeSurvey from './StudentList/JudgeSurvey';
import {withRouter} from 'react-router-dom';

// import { Container } from 'react-bootstrap/lib/Tab';
class JudgeDashboard extends Component {
  constructor(props) {
    super(props);
    if(localStorage.getItem('judgeToken')==null){
      props.history.push("/judge")
  }
    this.changeLocation = this.changeLocation.bind(this);
    
  }
  state = {
    SideDrawerOpen: false,
    title: "Home"
  }
  // static propTypes = {
  //   location: React.PropTypes.object.isRequired
  // }
  drawerToggleHandler = () => {
    this.setState((prevState) => {
      return { SideDrawerOpen: !prevState.SideDrawerOpen }
    });
  };
  backdropClickHandler = () => {
    this.setState({ SideDrawerOpen: false });
  };
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.changeLocation(this.props.location)
    }
    localStorage.setItem('comp_id', "5e895db09084462ed82efcc0")
  }
  changeLocation(location) {
    this.setState({ title: location })
  }
  render() {
    let backDrop;
    if (this.state.SideDrawerOpen) {
      backDrop = <BackDrop dropClicked={this.backdropClickHandler} />
    }
    return (
      <div className="App">
        <BrowserRouter>
          <SideDrawer showSideDrawer={this.state.SideDrawerOpen} />
          {backDrop}
          <Toolbar drawerClickHandler={this.drawerToggleHandler} SidebarOpen={this.state.SideDrawerOpen} title1={this.state.title} />
          <main className="judge-main">
            <div>
              <Switch>
                <Route exact path="/judge/dashboard" render={() => <CompetitionList onchangeLocation={this.changeLocation} />} />
                <Route exact path="/judge/studentlist/:comp_id" component={StudentList} />}/>
                <Route exact path="/judge/profile" render={() => <JudgeProfile onchangeLocation={this.changeLocation} />} />
                <Route exact path="/judge/showsurvey/:stu_id" component={JudgeSurvey} />}/>
          </Switch>
            </div>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}
export default withRouter(JudgeDashboard);
