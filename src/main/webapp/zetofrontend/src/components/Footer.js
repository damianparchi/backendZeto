import React, {useState, useEffect} from "react";
import {Container, Navbar, Col} from "react-bootstrap";

export default function Footer() {
    const [rok, setRok] = useState();

    useEffect(() => {
        setRok(new Date().getFullYear());
    }, [rok])


        return (
            <Navbar fixed={"bottom"} bg={"info"} variant={"dark"}>
                <Container>
                    <Col lg={12} className={"text-center text-break"}>
                        <div>{rok}-{rok+1}, Wszelkie prawa zastrzeżone przez B.P.S.W.G!</div>
                    </Col>
                </Container>
            </Navbar>
        )
}
