import React, {useState, useEffect} from "react";
import {Container, Navbar, Col} from "react-bootstrap";

const Footer = () => {
    const [rok, setRok] = useState();

    useEffect(() => {
        setRok(new Date().getFullYear());
    }, [rok])


        return (
<<<<<<< HEAD
            <Navbar fixed={"bottom"} bg={"info"} variant={"dark"}>
                <Container>
                    <Col lg={12} className={"text-center text-break"}>
=======
            <Navbar fixed={"bottom"} bg={"info"} style={{opacity:"0.6"}} variant={"dark"}>
                <Container>
                    <Col lg={12} className={"text-center text-white text-break"}>
>>>>>>> efa52a9 (frontend fix)
                        <div>{rok}-{rok+1}, Wszelkie prawa zastrzeżone przez B.P.S.W.G!</div>
                    </Col>
                </Container>
            </Navbar>
        )
}

export default Footer;