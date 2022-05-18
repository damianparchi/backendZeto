import React, {Component} from "react";
import {Nav, Navbar, Card, Form, Col, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faPlusSquare, faSave, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer";

export default class TaskAdmin extends Component {

    constructor(props) {
        super(props);
        this.state = {title:'', description: '', deadline: '', done: '', idUser: '', idAdmin: ''};
        this.taskChange = this.taskChange.bind(this);
        this.submitTask = this.submitTask.bind(this);
    }

    submitTask(event) {
        alert('title: ' + this.state.title +', description: ' + this.state.description + ', Deadline: ' + this.state.deadline + ', Done: '+ this.state.done + ', idUser: '+ this.state.idUser + ', idAdmin: '+ this.state.idAdmin);
        event.preventDefault();
    }

    taskChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        });
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
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusSquare}/> Dodaj Nowy Task
                    </Card.Header>
                    <Form onSubmit = {this.submitTask} id = "taskFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Nazwa</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name="title"
                                        value={this.state.title}
                                        onChange={this.taskChange}
                                        className="bg-dark text-white"
                                        placeholder="Podaj nazwe"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPrzypisanePrzez">
                                    <Form.Label>Przypisane przez</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name="idAdmin"
                                        value={this.state.idAdmin}
                                        onChange={this.taskChange}
                                        className="bg-dark text-white"
                                        placeholder="Podaj nazwe osoby przypisujacej zadanie"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridOpis">
                                    <Form.Label>Podaj opis</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name="description"
                                        value={this.state.description}
                                        onChange={this.taskChange}
                                        className="bg-dark text-white"
                                        placeholder="Podaj opis"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridPrzypisaneDla">
                                    <Form.Label>Przypisane dla</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name="idUser"
                                        value={this.state.idUser}
                                        onChange={this.taskChange}
                                        className="bg-dark text-white"
                                        placeholder="Przypisz dla"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridDeadline">
                                    <Form.Label>Podaj deadline</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name="deadline"
                                        value={this.state.deadline}
                                        onChange={this.taskChange}
                                        className="bg-dark text-white"
                                        placeholder="Podaj deadline"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDone">
                                    <Form.Label>Priorytet</Form.Label>
                                    <Form.Control
                                        required
                                        type="text" name="done"
                                        value={this.state.done}
                                        onChange={this.taskChange}
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
                <Footer/>
            </>
        )
    }

}