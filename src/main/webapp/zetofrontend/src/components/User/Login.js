import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col, InputGroup, Row, Card, Form, FormControl, Button, Alert} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faSignInAlt, faUndo} from "@fortawesome/free-solid-svg-icons";
import {authenticateUser} from "../../services/index";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        email:'', password:'', error:''
    }

    credentialChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    resetForm = () => {
        this.setState(() => this.initialState);
    }

    validateUser = () => {
        this.props.authenticateUser(this.state.email, this.state.password)
        setTimeout(() => {
            if(this.props.auth.isLoggedIn) {
                return this.props.history.push("/")
            } else {
                this.resetForm();
                this.setState({"error": "Zły email i hasło"})
            }
        }, 500)

    }


    render() {

        const {email, password, error} = this.state;

        return (
            <Row className={"justify-content-md-center"}>
                <Col xs={5}>
                    {error && <Alert variant={"danger"}>{error}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                       <Card.Header>
                           <FontAwesomeIcon icon={faSignInAlt}/> Zaloguj się!
                       </Card.Header>
                       <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl required autoComplete="off" type="text" name="email" value={email} onChange={this.credentialChange}
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
                                        <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={this.credentialChange}
                                            className={"bg-dark text-white"} placeholder="Podaj hasło"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                       </Card.Body>
                       <Card.Footer style={{"textAlign":"right"}}>
                            <Button size={"sm"} type={"button"} variant={"success"} onClick={this.validateUser}
                                    disabled={this.state.email.length===0 || this.state.password.length===0}>
                                <FontAwesomeIcon icon={faSignInAlt}/> Zaloguj
                            </Button>{' '}
                           <Button size={"sm"} type={"button"} variant={"info"} onClick={this.resetForm}
                                    disabled={this.state.email.length===0 && this.state.password.length===0 && this.state.error.length===0}>
                                <FontAwesomeIcon icon={faUndo}/> Wyczyść
                            </Button>
                       </Card.Footer>
                    </Card>
                </Col>
            </Row>
        );
    }
}
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticateUser: (email, password) => dispatch(authenticateUser(email, password))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);