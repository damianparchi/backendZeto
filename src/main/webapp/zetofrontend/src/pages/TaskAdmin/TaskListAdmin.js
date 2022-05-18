import React, {Component} from "react";
import Footer from "../Footer";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {Nav, Navbar, Card, Table} from "react-bootstrap";
import axios from 'axios'

export default class TaskListAdmin extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }


    componentDidMount() {
        axios.get("http://localhost:8080/tasks")
            .then(response => console.log(response.data));
    }

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
                        <Link to={"/listtaskAdmin"} className="nav-link">Task List</Link>
                        <Link to={"/addtask"} className="nav-link">Add Task</Link>
                        <Link to={"/listuserAdmin"} className="nav-link">User List</Link>
                        <Link to={"/adduser"} className="nav-link">Add User</Link>
                    </Nav>
                    <Link to={"/"} onClick={logOut}>
                        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </Link>
                </Navbar>
                <Card style={{margin:"30px"}} className={"border border-dark bg-dark text-white"}>
                    <Card.Header>Task List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant={"dark"}>
                            <thead>
                            <tr>
                                <th scope="col">Nazwa</th>
                                <th scope="col">Typ</th>
                                <th scope="col">Ilosc godzin</th>
                                <th scope="col">Status</th>
                                <th scope="col">Przypisane Dla</th>
                                <th scope="col">Priorytet</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr align={"center"}>
                                <td colSpan={"6"}>Brak Zadan</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <Footer/>
            </>
        )
    }
}