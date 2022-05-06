import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import  LoginPage from './pages/LoginPage';
import { Dashboard } from './pages/dashboard/dashboard';
import Footer from "./pages/Footer";
import TaskAdmin from "./pages/TaskAdmin/TaskAdmin";
import TaskListAdmin from "./pages/TaskAdmin/TaskListAdmin";
import User from "./pages/User/User";
import UserList from "./pages/User/UserList";
import TaskListUser from "./pages/TaskUser/TaskListUser";


function App() {
  return (
      <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route path="/listtaskAdmin" exact component={TaskListAdmin} />
                <Route path="/listuserAdmin" exact component={UserList} />
                <Route path="/addtask" exact component={TaskAdmin} />
                <Route path="/adduser" exact component={User} />
                <Route path="/listtaskUser" exact component={TaskListUser} />
            </Switch>
          <Footer/>
      </BrowserRouter>
  );
}

export default App;
