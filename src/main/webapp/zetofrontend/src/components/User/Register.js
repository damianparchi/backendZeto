import React, { useState, Component } from "react";
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Row, Col, Card, Form, InputGroup, FormControl, Button,} from "react-bootstrap";
import MyToast from "../MyToast";
import {registerUser} from "../../services/index";
import {connect} from "react-redux";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.message = '';
    }

    initialState = {
        name:'', email:'', password:'', contact:''
    };

    userChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    registerUser = () => {
        let userObj = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            mobile: this.state.contact
        }
        this.props.registerUser(userObj)
        this.resetRegisterForm()
        setTimeout(() => {
            if(this.props.user.message != null) {
                this.setState({
                    show: true,
                    message: this.props.user.message
                })
                setTimeout(() => {
                    this.setState({
                        show: false
                    })
                    this.props.history.push("/")
                }, 3000)
            } else {
                this.setState({show: false})

            }
        }, 2000)
    }

    resetRegisterForm = () => {
        this.setState(() => this.initialState);
    };

    render() {
        const {name, email, password, contact} = this.state;

        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show ={ this.state.show} message = {this.state.message} type = {"success"}/>
                </div>
                <Row className="justify-content-md-center">
                    <Col xs={5}>
                        <Card className={"border border-dark bg-dark text-white"}>
                            <Card.Header>
                                <FontAwesomeIcon icon={faUserPlus}/> Rejestracja
                            </Card.Header>
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FontAwesomeIcon icon={faUser}/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl autoComplete="off" type="text" name="name" value={name} onChange={this.userChange}
                                                         className={"bg-dark text-white"} placeholder="Podaj imie"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl required autoComplete="off" type="text" name="email" value={email} onChange={this.userChange}
                                                         className={"bg-dark text-white"} placeholder="Podaj adres e-mail"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={this.userChange}
                                                         className={"bg-dark text-white"} placeholder="Podaj Hasło"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FontAwesomeIcon icon={faPhone}/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl autoComplete="off" type="text" name="contact" value={contact} onChange={this.userChange}
                                                         className={"bg-dark text-white"} placeholder="Podaj numer telefonu"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                            <Card.Footer style={{"text-align":"right"}}>
                                <Button size="sm" type="button" variant="success"
                                        onClick={this.registerUser}
                                        disabled={this.state.email.length === 0 || this.state.password.length === 0}>
                                    <FontAwesomeIcon icon={faUserPlus}/> Zarejestruj
                                </Button>{' '}
                                <Button size="sm" type="button" variant="info" onClick={this.resetRegisterForm}>
                                    <FontAwesomeIcon icon={faUndo}/> Wyczyść
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>

            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (userObject) => dispatch(registerUser(userObject))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);