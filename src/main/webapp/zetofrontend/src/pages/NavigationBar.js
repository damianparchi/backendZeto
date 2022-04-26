import React from "react";
import {Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg={"dark"} variant={"dark"}>
                <Navbar.Brand href={"/"}><FontAwesomeIcon icon={faCalendar}/> System Rezerwacji Pracy Zdalnej</Navbar.Brand>
            </Navbar>
        )
    }
}


export default NavigationBar;