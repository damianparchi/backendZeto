import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer";

class TaskListUser extends React.Component {
    render() {
        const logOut=()=>{

            localStorage.clear();
            this.props.history.push("/");

        }
        return (
            <>
                <Navbar bg={"dark"} variant={"dark"}>
                    <Link to={"/dashboard"} className="navbar-brand">
                        <FontAwesomeIcon icon={faCalendar}> System Rezerwacji</FontAwesomeIcon>
                    </Link>
                    <Nav className={"mr-auto"}>
                        <Link to={"/listtaskUser"} className="nav-link">Task List</Link>
                        <Nav.Link href={"#"}>Godziny Pracy</Nav.Link>
                    </Nav>
                    <Link to={"/"} onClick={logOut}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </Link>
                </Navbar>
                <div className="text-white"> Task List </div>
                <Footer/>
            </>
        )
    }

}

export default TaskListUser;