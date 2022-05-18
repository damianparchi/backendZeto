import React,{useState} from 'react';
import {Nav} from 'react-bootstrap';
// import styled from 'styled-components';
import {fetchUserData} from "../../api/authenticationService";
import {Navbar, Jumbotron} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


// const MainWrapper=styled.div`
//     padding-top:40px;
// `;

export const Dashboard=(props)=>{

    const [data,setData]=useState({});

    React.useEffect(()=>{
        fetchUserData().then((response)=>{
            setData(response.data);
        }).catch((e)=>{
            localStorage.clear();
            props.history.push('/');
            console.log()
        })
    },[])

    const logOut=()=>{

        localStorage.clear();
        props.history.push('/');

    }

    return (
        <>
            <>
                {data && data.roles && data.roles.filter(value => value.roleCode==='ADMIN').length>0 &&
                    <Navbar bg={"dark"} variant={"dark"}>
                        <Link to={"/dashboard"} className="navbar-brand">
                            <FontAwesomeIcon icon={faCalendar}> System Rezerwacji</FontAwesomeIcon>
                        </Link>
                        <Nav className={"mr-auto"}>
                            <Link to={"/listtaskAdmin"} className="nav-link">Task List</Link>
                            <Link to={"/addtask"} className="nav-link">Add Task</Link>
                            <Link to={"/listuserAdmin"} className="nav-link">User List</Link>
                            <Link to={"/adduser"} className="nav-link">Add User</Link>
                        </Nav>
                        <Link to={"/"} onClick={logOut}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </Link>
                    </Navbar>
                }
            </>
            <>
                {data && data.roles && data.roles.filter(value => value.roleCode === 'ADMIN').length > 0 &&
                    <Jumbotron style = {{margin:"30px"}} className="bg-dark text-white">
                        <h1>Witaj {data && `${data.firstName} ${data.lastName}`}!</h1>
                        <blockquote className="blockquote mb-0">
                            <p>
                                B.P.S.W.G
                            </p>
                            <footer className="blockquote-footer">
                                Praca Zdalna
                            </footer>
                        </blockquote>
                    </Jumbotron>
                }
            </>
            <>
                {data && data.roles && data.roles.filter(value => value.roleCode==='USER').length>0 &&
                    <Navbar bg={"dark"} variant={"dark"}>
                        <Navbar.Brand href={"/dashboard"}>
                            <FontAwesomeIcon icon={faCalendar}> System Rezerwacji</FontAwesomeIcon>
                        </Navbar.Brand>
                        <Nav className={"mr-auto"}>
                            <Link to={"/listtaskUser"} className="nav-link">Task List</Link>
                            <Nav.Link href={"#"}>Godziny Pracy</Nav.Link>
                        </Nav>
                        <Nav.Link onClick={logOut}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </Nav.Link>
                    </Navbar>
                }
            </>
            <>
                {data && data.roles && data.roles.filter(value => value.roleCode === 'USER').length > 0 &&
                    <Jumbotron style = {{margin:"30px"}} className="bg-dark text-white">
                        <h1>Witaj {data && `${data.firstName} ${data.lastName}`}!</h1>
                        <blockquote className="blockquote mb-0">
                            <p>
                                B.P.S.W.G
                            </p>
                            <footer className="blockquote-footer">
                                Praca Zdalna
                            </footer>
                        </blockquote>
                    </Jumbotron>
                }
            </>
        </>
    )
}