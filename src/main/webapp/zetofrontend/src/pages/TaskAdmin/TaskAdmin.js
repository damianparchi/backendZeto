import React, {Component} from "react";
import {Nav, Navbar, Card, Form, Col, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faPlusSquare, faSave, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer";

export default class TaskAdmin extends Component {
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
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusSquare}/> Dodaj Nowy Task
                    </Card.Header>
                    <Form>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Nazwa</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name="title"
                                        value={""}
                                        onChange={""}
                                        className="bg-dark text-white"
                                        placeholder="Podaj nazwe"/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Typ</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name="typ"
                                        value={""}
                                        onChange={""}
                                        className="bg-dark text-white"
                                        placeholder="Podaj typ"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name="status"
                                        value={""}
                                        onChange={""}
                                        className="bg-dark text-white"
                                        placeholder="Podaj status"/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Przypisane dla</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name="przypisaneDla"
                                        value={""}
                                        onChange={""}
                                        className="bg-dark text-white"
                                        placeholder="Przypisz dla"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Ilosc godzin</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name="iloscGodzin"
                                        value={""}
                                        onChange={""}
                                        className="bg-dark text-white"
                                        placeholder="Podaj ilosc godzin"/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Priorytet</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name="priorytet"
                                        value={""}
                                        onChange={""}
                                        className="bg-dark text-white"
                                        placeholder="Podaj priorytet"/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{textAlign:"right"}}>
                            <Button size={"sm"} variant={"success"} type={"submit"}>
                                <FontAwesomeIcon icon={faSave}/> Submit
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
                /*<Footer/>*/
            </>
        )
    }

}