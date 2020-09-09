import React, {useState} from "react";
import Dash from "../components/navegation/Dash";
import Container from "react-bootstrap/Container";
import {Button, Card, ListGroup} from "react-bootstrap";
import GoogleMaps from "../components/Inputs/GoogleMapsInput";
import {RoutePath} from "../FarmaRoutes";
import HttpRequest from "../data/HttpRequest";

const Location = (props) => {
    let [latLng, setLatLng] = useState({lat: -27.5163541, lng: -48.841851});

    const mapChange = (latLng) => { setLatLng(latLng); };

    const onClick = (event) => {
        event.preventDefault();
        new HttpRequest().getProducts(props.location.state, latLng, result => {
            props.history.push(RoutePath.products, result);
        });
    };

    return <Dash {...props}>
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h2> Insira sua localização</h2> <hr/>
                    </Card.Title>
                    <ListGroup>
                        <ListGroup.Item style={{height: '22rem'}}>
                            <GoogleMaps onChange={mapChange}/>
                        </ListGroup.Item>
                        <ListGroup.Item className="text-center">
                            <Button className="buttonsClass" type="button" onClick={onClick}>
                                Confirmar localização
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Container>
    </Dash>
};

export default Location;