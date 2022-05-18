import React from "react";
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Container, Row, Col} from "react-bootstrap";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Task from "./components/Task/Task";
import TaskList from "./components/Task/TaskList";
import UserList from "./components/User/UserList";
import Login from "./components/User/Login";
import Register from "./components/User/Register";


import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
export default function App() {

  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = '';
    }
    return '';
  }


  const heading = "Witaj w Systemie pracy zdalnej!"
  const desc = "Ciezka praca to klucz do sukcesu!"
  const footer = "Damian Coelho"

  return (
    <Router>
      <NavigationBar/>
        <Container>
            <Row>
              <Col lg={12} className="marginTop">
                <Switch>
                  <Route path="/" exact component={() => <Welcome heading={heading} desc={desc} footer={footer}/>}/>
                  <Route path="/add" exact component={Task}/>
                  <Route path="/edit/:id" exact component={Task}/>
                  <Route path="/list" exact component={TaskList}/>
                  <Route path="/users" exact component={UserList}/>
                  <Route path="/register" exact component={Register}/>
                  <Route path="/login" exact component={Login}/>
                  <Route path="/logout" exact component={Login}/>
                </Switch>
              </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}
