import React from "react";
import {Button, Col, Image, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Basket from "../../data/Basket";
import FarmaStorage from "../../data/FarmaStorage";

const ProductsRequest = (props) => {
    const showOneProduct = [];
    props.products.forEach((current, index) => showOneProduct[index] = <ProductRequest product={current} update={props.update}/>);

    return <Table responsive style={{width:'42rem'}} className="text-center">
        <thead>
            <tr>
                <th> Produto </th>
                <th> Quantidade </th>
                <th> Preço </th>
                <th> Tipo de operação</th>
            </tr>
        </thead>
        <tbody>
            {showOneProduct}
        </tbody>
    </Table>;
};

const ProductRequest = (props) => {
    const onChange = (event) => {
        event.preventDefault();
        let howManyUnits = event.currentTarget.value;
        if(howManyUnits > 0){
            let basket = new Basket();
            basket.setHowManyById(props.product.id, howManyUnits);
            FarmaStorage.basket.set(basket);
            props.update();
        }
    };

    const removeClick = (event) => {
        event.preventDefault();
        let basket = new Basket();
        basket.removeOneProduct(props.product.id);
        FarmaStorage.basket.set(basket);
        props.update();
    };

    return <tr>
        <td>
            <Row>
                <Col> <Image style={{height:'5rem',width:'5rem'}} src={props.product.image}/> </Col>
                <Col> {props.product.name} </Col>
            </Row>
        </td>
        <td>
            <input type="number" className="form-control" value={props.product.howManyUnits} onChange={onChange}/>
            <OverlayTrigger overlay={<Tooltip>Remover todas as unidade deste medicamento</Tooltip>}>
                <Button onClick={removeClick} className="buttonsClass" type="button">Remover</Button>
            </OverlayTrigger>
        </td>
        <td> R$ {props.product.value} </td>
        <td> {props.product.toTake? "reservar" : "comprar"} </td>
    </tr>
};

export default ProductsRequest;