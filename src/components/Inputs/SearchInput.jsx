import React, {useState} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import {Image} from "react-bootstrap";
import Magnifying from "../../resource/magnifying.png";
import {RoutePath} from "../../FarmaRoutes";
import HttpRequest from "../../data/HttpRequest";
import FarmaStorage from "../../data/FarmaStorage";

const SearchInput = (props) => {
    let [search, setSearch] = useState("pesquisa");

    const onChange = (event) => {
        event.preventDefault();
        setSearch(event.currentTarget.value);
    };

    const onClick = (event) => {
        event.preventDefault();
        let user = FarmaStorage.user;
        if(user.isNull()){
            props.history.push(RoutePath.location, search);
        }else {
            new HttpRequest().getProducts(props.location.state, {lat: user.get().lat, lng: user.get().lng}, result => {
                props.history.push(RoutePath.products, result);
            });
        }
    };

    return <InputGroup>
        <InputGroup.Prepend>
            <FormControl type="text" placeholder={"Pesquisar medicamento..."} style={{width : '18rem'}} onChange={onChange}/>
        </InputGroup.Prepend>
        <InputGroup.Append>
            <Button variant="light" type="link" onClick={onClick}>
                <Image src={Magnifying} style={{height:'1rem',width:'1rem'}}/>
            </Button>
        </InputGroup.Append>
    </InputGroup>
};


export default SearchInput;