import React from "react";
import {Button, Card, ListGroup} from "react-bootstrap";
import HttpRequest from "../../data/HttpRequest";
import FarmaStorage from "../../data/FarmaStorage";

const BuyInfo = (props) => {
    const onClick = (event) => {
        event.preventDefault();
        new HttpRequest().buy(result => {
            if(JSON.parse(result).success){
                alert("Compra ou reserva realiza com sucesso");
                FarmaStorage.basket.remove();
            }else {
                alert("Erro ao efetuar a compra");
            }
        });
    };

    return <Card style={{width: "21rem"}}>
        <Card.Body>
            <ListGroup>
                <ListGroup.Item>
                    <h3> Resumo da compra </h3>
                    <p> {props.infos.howManyProducts} produtos </p>
                </ListGroup.Item>
                <ListGroup.Item className={"text-center"}>
                    <h3> Total R$ {props.infos.totalValue}</h3>
                    <Button onClick={onClick} className="buttonsClass" type="button"> Finalizar compra</Button>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
};

export default BuyInfo;