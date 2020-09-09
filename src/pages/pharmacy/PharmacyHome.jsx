import React from "react";
import PharmacyDash from "../../components/navegation/PharmacyDash";
import {Container, ListGroup} from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import FarmaStorage from "../../data/FarmaStorage";
import {RoutePath} from "../../FarmaRoutes";

const PharmacyHome = (props) => {
    let urlPharmacy = FarmaStorage.pharmacy.isNull()? RoutePath.pharmacy.signUp : RoutePath.pharmacy.home;
    return <PharmacyDash {...props}>
        <Container>
            <ListGroup>
                <ListGroup.Item>
                    <h1>Home</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Jumbotron fluid>
                        <Container className="ml-5">
                            <h1>Farma Compare</h1>
                            <p>
                                Farma compare é uma forma fácil e rápida de consultar medicamentos em sua região. <br/>
                                Para usar é super simples basta informar a localização e pesquisar o nome de um medicamento. <br/>
                                Nosso sistema busca o todos os medicamentos com o nome pesquisa na sua região. <br/>
                                Incluindo genéricos e similares. <br/>
                                Caso prefira você pode registrar se no nosso sistema e comprar online  <br/>
                                ou também reservar um medicamento para retirada direto na farmácia. <br/>
                            </p>
                            <p>
                                <h4> Comece Já: </h4>
                                <Button href={RoutePath.home} className="buttonsClass mr-1">Sou usuario</Button>
                                <Button href={urlPharmacy} className="buttonsClass">Sou uma Farmácia</Button>
                            </p>
                        </Container>
                    </Jumbotron>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    </PharmacyDash>
};

export default PharmacyHome;