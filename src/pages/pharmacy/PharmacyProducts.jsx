import React from "react";
import PharmacyDash from "../../components/navegation/PharmacyDash";
import {ListGroup, Row} from "react-bootstrap";
import {RoutePath} from "../../FarmaRoutes";
import Button from "react-bootstrap/Button";
import PharmacyProductView from "../../components/view/PharmacyProductView";
import Col from "react-bootstrap/Col";

const PharmacyProducts = (props) => {
    let productsArray = props.location.state;

    let viewers = [];

    if(productsArray == null || productsArray.length == null || productsArray.length === 0){
        viewers[0] = <div className="text-center">
            <h1> Nenhum Medicamento cadastrado </h1>
            <Button variant="primary" className="buttonsClass" href={RoutePath.pharmacy.addProduct}>Cadastrar produtos</Button>
        </div>
    }else {
        productsArray.forEach(((value, index) => viewers[index] = <Col>
            <PharmacyProductView product={value}/>
        </Col>));
    }

    return <PharmacyDash {...props}>
        <ListGroup>
            <ListGroup.Item>
                <h1>Produtos</h1>
            </ListGroup.Item>
            <ListGroup.Item>
                <Row>
                    {viewers}
                </Row>
            </ListGroup.Item>
        </ListGroup>
    </PharmacyDash>
};

export default PharmacyProducts;