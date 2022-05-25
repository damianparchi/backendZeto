<<<<<<< HEAD
import React, { useState, Component } from "react";
=======
import React, {useState} from "react";
>>>>>>> efa52a9 (frontend fix)
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Row, Col, Card, Form, InputGroup, FormControl, Button,} from "react-bootstrap";
import MyToast from "../MyToast";
import {registerUser} from "../../services/index";
<<<<<<< HEAD
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
=======
import {useDispatch} from "react-redux";


const Register = (props) => {

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')

    const initialState = {
        name:'', email:'', password:'', mobile:''
    };

    const [user, setUser] = useState(initialState)

    const userChange = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]:value})
    };

    const dispatch = useDispatch()

    const saveUser = () => {
        dispatch(registerUser(user))
            .then((response) => {
                setShow(true);
                setMessage(response.message)
                resetRegisterForm()
                setTimeout(() => {
                    setShow(false)
                    props.history.push("/login")
                },2000)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const resetRegisterForm = () => {
        setUser(initialState);
    };

        return (
            <div>
                <div style={{"display": show ? "block" : "none"}}>
                    <MyToast show ={ show} message = {message} type = {"success"}/>
>>>>>>> efa52a9 (frontend fix)
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
<<<<<<< HEAD
                                            <FormControl autoComplete="off" type="text" name="name" value={name} onChange={this.userChange}
=======
                                            <FormControl autoComplete="off" type="text" name="name" value={user.name} onChange={userChange}
>>>>>>> efa52a9 (frontend fix)
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
<<<<<<< HEAD
                                            <FormControl required autoComplete="off" type="text" name="email" value={email} onChange={this.userChange}
=======
                                            <FormControl required autoComplete="off" type="text" name="email" value={user.email} onChange={userChange}
>>>>>>> efa52a9 (frontend fix)
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
<<<<<<< HEAD
                                            <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={this.userChange}
=======
                                            <FormControl required autoComplete="off" type="password" name="password" value={user.password} onChange={userChange}
>>>>>>> efa52a9 (frontend fix)
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
<<<<<<< HEAD
                                            <FormControl autoComplete="off" type="text" name="contact" value={contact} onChange={this.userChange}
=======
                                            <FormControl autoComplete="off" type="text" name="mobile" value={user.mobile} onChange={userChange}
>>>>>>> efa52a9 (frontend fix)
                                                         className={"bg-dark text-white"} placeholder="Podaj numer telefonu"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
<<<<<<< HEAD
                            <Card.Footer style={{"text-align":"right"}}>
                                <Button size="sm" type="button" variant="success"
                                        onClick={this.registerUser}
                                        disabled={this.state.email.length === 0 || this.state.password.length === 0}>
                                    <FontAwesomeIcon icon={faUserPlus}/> Zarejestruj
                                </Button>{' '}
                                <Button size="sm" type="button" variant="info" onClick={this.resetRegisterForm}>
=======
                            <Card.Footer style={{"textAlign":"right"}}>
                                <Button size="sm" type="button" variant="success"
                                        onClick={saveUser}
                                        disabled={user.email.length === 0 || user.password.length === 0}>
                                    <FontAwesomeIcon icon={faUserPlus}/> Zarejestruj
                                </Button>{' '}
                                <Button size="sm" type="button" variant="info" onClick={resetRegisterForm}>
>>>>>>> efa52a9 (frontend fix)
                                    <FontAwesomeIcon icon={faUndo}/> Wyczyść
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>

            </div>

        );
<<<<<<< HEAD
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
=======
}


export default Register;
>>>>>>> efa52a9 (frontend fix)
