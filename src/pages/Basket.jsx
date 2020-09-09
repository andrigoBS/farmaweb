import React, {useState} from "react";
import Dash from "../components/navegation/Dash";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import BasketData from "../data/Basket";
import BuyInfo from "../components/basic/BuyInfo";
import ProductsRequest from "../components/basic/ProductsRequest";

const Basket = (props) => {
    let [valueState, setValue] = useState(true);
    let basket = new BasketData();
    let products = basket.products;

    const update = () => {
        setValue(!valueState);
    };

    let buyInfos = () => {
        let totalValue = 0;
        let howManyProducts = 0;
        products.forEach((currentValue) => totalValue += currentValue.value * currentValue.howManyUnits);
        products.forEach((currentValue) => howManyProducts += currentValue.howManyUnits);
        return {howManyProducts: howManyProducts, totalValue: totalValue};
    };

    return <Dash {...props}>
        <Container>
            <ListGroup>
                <ListGroup.Item>
                    <h1>Minha Cesta</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Container>
                        <Row>
                            <Col> <ProductsRequest products={products} update={update}/> </Col>
                            <Col> <BuyInfo infos={buyInfos()}/> </Col>
                        </Row>
                    </Container>
                </ListGroup.Item>
            </ListGroup>
        </Container>
    </Dash>
};

export default Basket;