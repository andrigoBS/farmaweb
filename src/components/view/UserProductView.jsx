import React from "react";
import {Button, Card, Image, ListGroup} from "react-bootstrap";
import GoogleMapsViewPoint from "./GoogleMapsViewPoint";
import FarmaStorage from "../../data/FarmaStorage";
import Basket from "../../data/Basket";
import PharmacyInfo from "../basic/PharmacyInfo";

const UserProductView = (props) => {
    const product = props.product;
    const pharmacy = product.pharmacy;
    const info = product.info;

    const basketSave = (toTake, info) => {
        let basket = new Basket();
        basket.addProduct({
            id: product.id,
            image: product.image,
            name: product.name,
            value: product.value,
            howManyUnits: 1,
            toTake: toTake,
        });
        FarmaStorage.basket.set(basket);
        alert("Item adicionado a cestinha com sucesso");
        if(FarmaStorage.user.isNull()){
            alert("Você não está logado, faça login para acessar a cestinha");
        }
    };

    const toTake = (event) => {
        event.preventDefault();
        basketSave(true);
    };

    const buy = (event) => {
        event.preventDefault();
        basketSave(false);
    };

    return <Card>
        <Card.Body>
            <ListGroup horizontal={"lg"}>
                <ListGroup.Item>
                    <Image style={{height:'12rem',width:'9rem'}} src={product.image}/>
                </ListGroup.Item>
                <ListGroup.Item className="text-center">
                    <h5>{product.name}</h5>
                    <br/><br/>
                    <h3>R$ {product.value}</h3>
                    {pharmacy.haveDelivery? <Button type="button" className="buttonsClass" onClick={buy}>comprar</Button>: ""}
                    <Button type="button" className="buttonsClass" onClick={toTake}>Reservar</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                    Tipo: <b>{info.type}</b> <br/>
                    Laboratório: <b>{info.laboratory}</b>  <br/>
                    Prescrição: <b>{info.prescription? "É" : "Não é"} necessário</b> <br/>
                    Descrição: <b>{info.description}</b>  <br/>
                </ListGroup.Item>
                <ListGroup.Item>
                    <PharmacyInfo pharmacy={pharmacy}/>
                </ListGroup.Item>
                <ListGroup.Item style={{height: "17rem", width: "17rem"}}>
                    <h5>Localização da Farmácia</h5>
                    <GoogleMapsViewPoint latLng={pharmacy.latLng} style={{height:'12rem',width:'12rem'}}/>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
};

export default UserProductView;