import react, { useState } from 'react';
import React from 'react';
import { connect } from 'react-redux';
import { authenticate, authFailure, authSuccess } from '../redux/authActions';
import './loginpage.css';
import { userLogin } from '../api/authenticationService';
import { Alert, Spinner } from 'react-bootstrap';

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
        <div className="login-page">
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-md-center h-100">
                        <div className="card-wrapper">
                            <div className="card fat">
                                <div className="card-body">
                                    <h4 className="card-title">Zaloguj się!</h4>
                                    <form className="my-login-validation" onSubmit={handleSubmit} noValidate={true}>
                                        <div className="form-group">
                                            <label htmlFor="email">Login</label>
                                            <input id="username" type="text"
                                                className="form-control"
                                                minLength={5}
                                                value={values.userName}
                                                onChange={handleChange}
                                                name="userName"
                                                required />
                                            <div className="invalid-feedback">
                                                UserId is invalid
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Hasło
                                                <a href="forgot.html" className="float-right">
                                                    Zapomniałeś hasła?
                                                </a>
                                            </label>
                                            <input
                                                id="password"
                                                type="password"
                                                className="form-control"
                                                minLength={8} value={values.password}
                                                onChange={handleChange}
                                                name="password"
                                                required />
                                            <div className="invalid-feedback">
                                                Hasło jest wymagane!
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox">
                                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                <label className="custom-control-label" htmlFor="customCheck1">Zapamiętaj</label>
                                            </div>
                                        </div>
                                        <div className="form-group m-0">
                                            <button type="submit" className="btn btn-primary">
                                                Zaloguj
                                                {loading && (
                                                    <Spinner
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                {/* <ClipLoader
                                //css={override}
                                size={20}
                                color={"#123abc"}
                                loading={loading}
                                /> */}
                                            </button>
                                        </div>
                                    </form>
                                    {error &&
                                        <Alert style={{ marginTop: '20px' }} variant="danger">
                                            {error}
                                        </Alert>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
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
