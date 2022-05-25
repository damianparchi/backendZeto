<<<<<<< HEAD
import React, {Component} from 'react';
import {connect} from "react-redux";
=======
import React, {useState} from 'react';
import { useDispatch} from "react-redux";
>>>>>>> efa52a9 (frontend fix)
import {Col, InputGroup, Row, Card, Form, FormControl, Button, Alert} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock, faSignInAlt, faUndo} from "@fortawesome/free-solid-svg-icons";
import {authenticateUser} from "../../services/index";

<<<<<<< HEAD
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
                return this.props.history.push("/home")
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
                    {this.props.message && <Alert variant={"success"}>{this.props.message}</Alert>}
                    {error && <Alert variant={"danger"}>{error}</Alert>}
                    <Card className={"border border-dark bg-dark text-white"}>
                       <Card.Header>
                           <FontAwesomeIcon icon={faSignInAlt}/> Zaloguj się!
=======
const Login = (props) => {

    const [error, setError] = useState();
    const [show, setShow] = useState(true);

    const initialState = {
        email:'', password:''
    }

    const [ user, setUser] = useState(initialState);

    const credentialChange = event => {
        const { name, value } = event.target
        setUser({...user, [name]: value})
    }

    const dispatch = useDispatch();

    const resetForm = () => {
       setUser(initialState);
    }

    const validateUser = () => {
      dispatch(authenticateUser(user.email, user.password))
        .then((response) => {
            console.log(response.data)
            return props.history.push("/home")
        })
        .catch((error) => {
            console.log(error.message)
            setShow(true);
            resetForm();
            setError("Zły email i hasło")
        })
    }

        return (
            <Row className={"justify-content-md-center"}>
                <Col xs={5}>
                    {show && props.message && (
                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                            {props.message}
                        </Alert>
                    )}
                    {show && error && (
                        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                            {error}
                        </Alert>
                    )}
                    <Card className={"border border-info bg-dark text-white"}>
                       <Card.Header>
                           <FontAwesomeIcon style={{color: "white"}} icon={faSignInAlt}/> Zaloguj się!
>>>>>>> efa52a9 (frontend fix)
                       </Card.Header>
                       <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><FontAwesomeIcon icon={faEnvelope}/></InputGroup.Text>
                                        </InputGroup.Prepend>
<<<<<<< HEAD
                                        <FormControl required autoComplete="off" type="text" name="email" value={email} onChange={this.credentialChange}
=======
                                        <FormControl required autoComplete="off" type="text" name="email" value={user.email} onChange={credentialChange}
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
                                        <FormControl required autoComplete="off" type="password" name="password" value={password} onChange={this.credentialChange}
=======
                                        <FormControl required autoComplete="off" type="password" name="password" value={user.password} onChange={credentialChange}
>>>>>>> efa52a9 (frontend fix)
                                            className={"bg-dark text-white"} placeholder="Podaj hasło"/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                       </Card.Body>
                       <Card.Footer style={{"textAlign":"right"}}>
<<<<<<< HEAD
                            <Button size={"sm"} type={"button"} variant={"success"} onClick={this.validateUser}
                                    disabled={this.state.email.length===0 || this.state.password.length===0}>
                                <FontAwesomeIcon icon={faSignInAlt}/> Zaloguj
                            </Button>{' '}
                           <Button size={"sm"} type={"button"} variant={"info"} onClick={this.resetForm}
                                    disabled={this.state.email.length===0 && this.state.password.length===0 && this.state.error.length===0}>
=======
                            <Button size={"sm"} type={"button"} variant={"success"} onClick={validateUser}
                                    disabled={user.email.length===0 || user.password.length===0}>
                                <FontAwesomeIcon icon={faSignInAlt}/> Zaloguj
                            </Button>{' '}
                           <Button size={"sm"} type={"button"} variant={"info"} onClick={resetForm}
                                    disabled={user.email.length===0 && user.password.length===0}>
>>>>>>> efa52a9 (frontend fix)
                                <FontAwesomeIcon icon={faUndo}/> Wyczyść
                            </Button>
                       </Card.Footer>
                    </Card>
                </Col>
            </Row>
        );
<<<<<<< HEAD
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
=======
}


export default Login;
>>>>>>> efa52a9 (frontend fix)
