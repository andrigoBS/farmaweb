import React from "react";
import {Image, ListGroup, Media} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../resource/pharmacyLogo.ico";
import PharmacyLoginInput from "../Inputs/PharmacyLoginInput";

const PharmacyDash = (props) => {
    return <div>
        <ListGroup variant="flush">
            <ListGroup.Item>
                <Navbar className="navBarBackground" variant="light" expand="lg" fixed="top">
                    <Navbar.Brand href="/pharmacy" style={{width: '18rem'}} >
                        <Media>
                            <Image style={{height:'3rem',width:'3rem'}} src={Logo}/>
                            <Media.Body>
                                <h2>Farma Compare</h2>
                            </Media.Body>
                        </Media>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <div className="mr-auto">
                            <h2> Farmácias </h2>
                        </div>
                        <PharmacyLoginInput {...props}/>
                    </Navbar.Collapse>
                </Navbar>
            </ListGroup.Item>
            <ListGroup.Item style={{height: '78px'}}/>
            <ListGroup.Item>
                {props.children}
            </ListGroup.Item>
        </ListGroup>
    </div>
};
export default PharmacyDash;