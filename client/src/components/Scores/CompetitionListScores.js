import React, { Component } from 'react';
import './CompetitionList.css';
import { Container} from 'react-bootstrap'
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
 class CompetitionList extends Component {
     constructor(props){
         super(props);
         
        this.state={
            competitions:[],
            searchtext:''
        };
     }
    
    componentDidMount(){
        // this.props.onchangeLocation( "Home");
        this.setState({searchtext:''})
        axios.get('/api/competitions')
        .then(res=>{
            this.setState({competitions:res.data});
        })
    }
    handleGO(competition_id){
        var link ='/admin/finalizeScores/'+competition_id
        this.props.history.push(link);
    }
    handleSearch = (event) =>{
        
        // let filteredList = this.state.competitions.filter((comp)=>{
        //     return comp.title.toLowerCase().includes("comp");
        // })
        this.setState({searchtext:event.target.value});
        console.log(this.state.searchtext);
    }
    render() {
        
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                { 
                    this.state.competitions.map(comp => {
                        return <div className="card-competition" onClick={this.handleGO.bind(this,comp._id)} key={comp._id}>
                        <div className="card-body">
                            <h5 className="card-title">{comp.title}</h5>
                            <p className="card-text">{comp.description}</p>
                            <h6 className="card-subtitle mb-2 text-muted">{comp.end_date}</h6>
                        </div>
                      </div>
                    })
                }
                </Col>
                </Row>
                </Container>
            </div>
        )
    }
}

export default withRouter(CompetitionList);