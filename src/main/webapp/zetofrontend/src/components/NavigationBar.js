import React from "react";
<<<<<<< HEAD
import {connect} from "react-redux";
=======
import { useDispatch, useSelector} from "react-redux";
>>>>>>> efa52a9 (frontend fix)
import {Navbar, Nav} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {logoutUser} from "../services/index";
import {
    faCalendar,
    faPlusSquare,
    faSignInAlt,
    faSignOutAlt,
    faTasks,
    faUserPlus,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
<<<<<<< HEAD

const NavigationBar = (props) => {
    const logout = () => {
        props.logoutUser()
=======
import '../assets/css/Style.css';
const NavigationBar = () => {

    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutUser())
>>>>>>> efa52a9 (frontend fix)
    }

    const guestLinks = (
        <>
            <div className={"mr-auto"}></div>
            <Nav className={"navbar-right"}>
<<<<<<< HEAD
                <Link to={"login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt}/> Zaloguj się!</Link>
=======
                <Link to={"login"} className="nav-link" style={{color: "white"}}><FontAwesomeIcon icon={faSignInAlt}/> Zaloguj się!</Link>
>>>>>>> efa52a9 (frontend fix)
            </Nav>
        </>
    );

    const userLinks = (
        <>
            <Nav className={"mr-auto"}>
<<<<<<< HEAD
                <Link to={"/add"} className="nav-link"><FontAwesomeIcon icon={faPlusSquare}/> Dodaj Task</Link>
                <Link to={"list"} className="nav-link"><FontAwesomeIcon icon={faTasks}/> Lista Tasków</Link>
                <Link to={"users"} className="nav-link"><FontAwesomeIcon icon={faUsers}/> Lista Użytkowników</Link>
            </Nav>
            <Nav className={"navbar-right"}>
                <Link to={"register"} className="nav-link"><FontAwesomeIcon icon={faUserPlus}/> Zarejestruj użytkownika!</Link>
                <Link to={"logout"} className="nav-link" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt}/> Wyloguj się!</Link>
=======
                <Link to={"/add"} style={{color: "white"}} className="nav-link"><FontAwesomeIcon icon={faPlusSquare}/> Dodaj Task</Link>
                <Link to={"list"} style={{color: "white"}} className="nav-link"><FontAwesomeIcon icon={faTasks}/> Lista Tasków</Link>
                <Link to={"users"} style={{color: "white"}} className="nav-link"><FontAwesomeIcon icon={faUsers}/> Lista Użytkowników</Link>
            </Nav>
            <Nav className={"navbar-right"}>
                <Link to={"register"} style={{color: "white"}} className="nav-link"><FontAwesomeIcon icon={faUserPlus}/> Zarejestruj użytkownika!</Link>
                <Link to={"logout"} style={{color: "white"}} className="nav-link" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt}/> Wyloguj się!</Link>
>>>>>>> efa52a9 (frontend fix)
            </Nav>
        </>
    );

    return (
        <div>
<<<<<<< HEAD
            <Navbar bg="info" variant="dark">
                <Link to={""} className="navbar-brand text-white">
                    <FontAwesomeIcon icon={faCalendar}/> System pracy zdalnej
                </Link>
                {props.auth.isLoggedIn ? userLinks : guestLinks}
=======
            <Navbar bg="info" style={{opacity:"0.8"}} variant="dark">
                <Link to={auth.isLoggedIn ? "home" : ""} className="navbar-brand text-white">
                    <FontAwesomeIcon icon={faCalendar}/> System pracy zdalnej
                </Link>
                {auth.isLoggedIn ? userLinks : guestLinks}
>>>>>>> efa52a9 (frontend fix)
            </Navbar>
        </div>
    );
}

<<<<<<< HEAD
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
=======
export default NavigationBar;
>>>>>>> efa52a9 (frontend fix)
