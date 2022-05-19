import React from "react";
import {connect} from "react-redux";
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

const NavigationBar = (props) => {
    const logout = () => {
        props.logoutUser()
    }

    const guestLinks = (
        <>
            <div className={"mr-auto"}></div>
            <Nav className={"navbar-right"}>
                <Link to={"login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt}/> Zaloguj się!</Link>
            </Nav>
        </>
    );

    const userLinks = (
        <>
            <Nav className={"mr-auto"}>
                <Link to={"/add"} className="nav-link"><FontAwesomeIcon icon={faPlusSquare}/> Dodaj Task</Link>
                <Link to={"list"} className="nav-link"><FontAwesomeIcon icon={faTasks}/> Lista Tasków</Link>
                <Link to={"users"} className="nav-link"><FontAwesomeIcon icon={faUsers}/> Lista Użytkowników</Link>
            </Nav>
            <Nav className={"navbar-right"}>
                <Link to={"register"} className="nav-link"><FontAwesomeIcon icon={faUserPlus}/> Zarejestruj użytkownika!</Link>
                <Link to={"logout"} className="nav-link" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt}/> Wyloguj się!</Link>
            </Nav>
        </>
    );

    return (
        <div>
            <Navbar bg="info" variant="dark">
                <Link to={""} className="navbar-brand text-white">
                    <FontAwesomeIcon icon={faCalendar}/> System pracy zdalnej
                </Link>
                {props.auth.isLoggedIn ? userLinks : guestLinks}
            </Navbar>
        </div>
    );
}

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
