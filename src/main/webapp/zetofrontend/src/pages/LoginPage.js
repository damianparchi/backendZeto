import React, {useState} from 'react';
import { connect } from 'react-redux';
import { authenticate, authFailure, authSuccess } from '../redux/authActions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignInAlt, faEnvelope, faLock,} from "@fortawesome/free-solid-svg-icons";
import { userLogin } from '../api/authenticationService';
import {Row, Col, Card, Form, InputGroup, FormControl, Button, Alert, Spinner} from "react-bootstrap";

const LoginPage = ({ loading, error, ...props }) => {


    const [values, setValues] = useState({
        userName: '',
        password: ''
    });

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.authenticate();

        userLogin(values).then((response) => {

            console.log("response", response);
            if (response.status === 200) {
                props.setUser(response.data);
                props.history.push('/dashboard');
            }
            else {
                props.loginFailure('Coś poszło nie tak!1 Spróbuj jeszcze raz.');
            }


        }).catch((err) => {

            if (err && err.response) {
                switch (err.response.status) {
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Podaj poprawny login lub hasło2.");
                        break;
                    default:
                        props.loginFailure('Coś poszło nie tak!2 Spróbuj jeszcze raz.');
                }
            }
            else {
                props.loginFailure('Coś poszło nie tak!3 Spróbuj jeszcze raz.');
            }




        });
        console.log("Loading again",loading);


    }

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
        console.log(e);
    };

    console.log("Loading ", loading);

    return (
        <Row className="justify-content-md-center" style={{ margin: '60px' }}>
            <Col xs={5}>
                <Card className={"border border-dark bg-dark text-white"}>
                    {/*<div className="row justify-content-md-center h-100">*/}
                    <Card.Header>
                        <FontAwesomeIcon icon={faSignInAlt} /> Zaloguj się!
                    </Card.Header>
                        <Card.Body>
                            <label htmlFor="email">Login</label>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        required
                                        id={"username"}
                                        autoComplete="off"
                                        type="text"
                                        name="userName"
                                        value={values.userName}
                                        onChange={handleChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Login"
                                    />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <label>Hasło</label>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>
                                                <FontAwesomeIcon icon={faLock} />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            id={"password"}
                                            required
                                            autoComplete="off"
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Hasło"
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            {error &&
                                <Alert style={{ marginTop: '20px' }} variant="danger">
                                    {error}
                                </Alert>
                            }
                        </Card.Body>
                    <Card.Footer style={{ textAlign: "right" }}>
                        <Button
                            size={"sm"}
                            type={"submit"}
                            variant={"success"}
                            onClick={handleSubmit}
                            disabled={values.userName.length === 0 || values.password.length === 0}>
                            <FontAwesomeIcon icon={faSignInAlt} /> Login {loading && (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        )}
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>

    )

}

const mapStateToProps = ({ auth }) => {
    console.log("state ", auth)
    return {
        loading: auth.loading,
        error: auth.error
    }
}


const mapDispatchToProps = (dispatch) => {

    return {
        authenticate: () => dispatch(authenticate()),
        setUser: (data) => dispatch(authSuccess(data)),
        loginFailure: (message) => dispatch(authFailure(message))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
