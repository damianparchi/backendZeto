import React, { useState } from "react";
import {
    faPhone,
    faEnvelope,
    faLock,
    faUndo,
    faUserPlus,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    Row,
    Col,
    Card,
    Form,
    InputGroup,
    FormControl,
    Button,
} from "react-bootstrap";
import MyToast from "../MyToast";


const Register = (props) => {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const initialState = {
        name: "",
        email: "",
        password: "",
        mobile: "",
    };

    const [user, setUser] = useState(initialState);


        const resetForm = () => {
            setUser(initialState);
        };

        return (
            <div>
                <div style={{display: "none"}}>
                    <MyToast type={"success"}/>
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
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faUser}/>
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                autoComplete="off"
                                                type="text"
                                                name="name"
                                                className={"bg-dark text-white"}
                                                placeholder="Podaj Imie"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faEnvelope}/>
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                required
                                                autoComplete="off"
                                                type="text"
                                                name="email"
                                                className={"bg-dark text-white"}
                                                placeholder="Podaj adres e-mail"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faLock}/>
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                required
                                                autoComplete="off"
                                                type="password"
                                                name="password"
                                                className={"bg-dark text-white"}
                                                placeholder="Podaj hasło"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faPhone}/>
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl
                                                autoComplete="off"
                                                type="text"
                                                name="mobile"
                                                className={"bg-dark text-white"}
                                                placeholder="Podaj numer telefonu"
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                            <Card.Footer style={{textAlign: "right"}}>
                                <Button
                                    size="sm"
                                    type="button"
                                    variant="success"
                                >
                                    <FontAwesomeIcon icon={faUserPlus}/> Zarejestruj
                                </Button>{" "}
                                <Button
                                    size="sm"
                                    type="button"
                                    variant="info"
                                    onClick={resetForm}
                                >
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