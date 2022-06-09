import React, {useState} from "react";
import {faPhone, faEnvelope, faLock, faUndo, faUserPlus, faUser,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Row, Col, Card, Form, InputGroup, FormControl, Button,} from "react-bootstrap";
import MyToast from "../MyToast";
import {registerUser} from "../../services/index";
import {useDispatch} from "react-redux";
import UserList from "./UserList";



const Register = (props) => {

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')

    const initialState = {
        userName:'', password:'', firstName:'', lastName:'', email:'', phoneNumber:''
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
                    props.history.push("/home")
                },2000)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const resetRegisterForm = () => {
        setUser(initialState);
        UserList.setState({ref : Math.random()});

    };

        return (
            <div>
                <div style={{"display": show ? "block" : "none"}}>
                    <MyToast show ={ show} message = {message} type = {"success"}/>
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
                                            <FormControl autoComplete="off" type="text" name="userName" value={user.userName} onChange={userChange}
                                                         className={"bg-dark text-white"} placeholder="Podaj  nazwe użytkownika"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FontAwesomeIcon icon={faLock}/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl required autoComplete="off" type="password" name="password" value={user.password} onChange={userChange}
                                                         className={"bg-dark text-white"} placeholder="Podaj Hasło"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl required autoComplete="off" type="text" name="firstName" value={user.firstName} onChange={userChange}
                                                         className={"bg-dark text-white"} placeholder="Podaj Imię"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FontAwesomeIcon icon={faPhone}/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl autoComplete="off" type="text" name="lastName" value={user.lastName} onChange={userChange}
                                                         className={"bg-dark text-white"} placeholder="Podaj nazwisko"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl required autoComplete="off" type="text" name="email" value={user.email} onChange={userChange}
                                                         className={"bg-dark text-white"} placeholder="Podaj adres e-mail"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl required autoComplete="off" type="text" name="phoneNumber" value={user.phoneNumber} onChange={userChange}
                                                         className={"bg-dark text-white"} placeholder="Podaj numer telefonu"/>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                            <Card.Footer style={{"textAlign":"right"}}>
                                <Button size="sm" type="button" variant="success"
                                        onClick={saveUser}
                                        disabled={user.email.length === 0 || user.password.length === 0}>
                                    <FontAwesomeIcon icon={faUserPlus}/> Zarejestruj
                                </Button>{' '}
                                <Button size="sm" type="button" variant="info" onClick={resetRegisterForm}>
                                    <FontAwesomeIcon icon={faUndo}/> Wyczyść
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>

            </div>

        );
}


export default Register;
