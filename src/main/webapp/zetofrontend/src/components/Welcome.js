import React from "react";
import authToken from '../utils/authToken';

export default function Welcome(props) {

    if(localStorage.jwtToken) {
        authToken(localStorage.jwtToken);
    }

        return (
            <div className={"bg-dark text-white jumbotron"}>
                <h1>{props.heading}</h1>
                <blockquote className={"blockquote mb-0"}>
                    <p>
                        {props.desc}
                    </p>
                    <footer className={"blockquote-footer"}>
                        {props.footer}
                    </footer>
                </blockquote>
            </div>
        );
}