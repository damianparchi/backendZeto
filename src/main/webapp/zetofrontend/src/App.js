import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import  LoginPage from './pages/LoginPage';
import { Dashboard } from './pages/dashboard/dashboard';
import NavigationBar from "./pages/NavigationBar";
import Footer from "./pages/Footer";


function App() {
  return (
      <BrowserRouter>
          <NavigationBar/>
          <Footer/>
        <Switch>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/dashboard" component={Dashboard}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
