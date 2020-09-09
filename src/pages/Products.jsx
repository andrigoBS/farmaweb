import React from "react";
import Dash from "../components/navegation/Dash";
import {ListGroup} from "react-bootstrap";
import UserProductView from "../components/view/UserProductView";

const Products = (props) =>{
    let productsArray = props.location.state;

    let viewers = [];

    if(productsArray == null || productsArray.length == null || productsArray.length === 0){
        viewers[0] = <h1 className="text-center"> Nenhum Medicamento encontrado </h1>
    }else {
        productsArray.forEach(((value, index) => viewers[index] = <ListGroup.Item>
            <UserProductView product={value}/>
        </ListGroup.Item>));
    }

    return <Dash {...props}>
        <ListGroup>
            <ListGroup.Item>
                <h1>Produtos</h1>
            </ListGroup.Item>
            {viewers}
        </ListGroup>
    </Dash>
};

export default Products;