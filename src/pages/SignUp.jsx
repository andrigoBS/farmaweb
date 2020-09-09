import React, {useState} from "react";
import Dash from "../components/navegation/Dash";
import Form from "react-bootstrap/Form";
import {Button, Card, Container, ListGroup} from "react-bootstrap";
import GoogleMapsInput from "../components/Inputs/GoogleMapsInput";
import HttpRequest from "../data/HttpRequest";
import FarmaRoutes from "../FarmaRoutes";
import CpfCnpj from "../data/CpfCnpj";
import FarmaStorage from "../data/FarmaStorage";

const infos = {
    name: "Digite seu nome...",
    password: "Digite sua senha...",
    passwordConfirm: "Digite novamente sua senha...",
    cpf: "Exemplo: 12345678900",
};

const labels = {
    name: "Nome",
    password: "Senha",
    passwordConfirm: "Confirmar senha",
    cpf: "CPF",
};

const SignUp = (props) => {
    let [values, setValues] = useState({
        data: {
            name: "",
            password: "",
            passwordConfirm: "",
            cpf: 0,
            latLng: {
                lat: 0,
                lng: 0,
            },
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = values.data;
        console.log(data);
        if (data.password === data.passwordConfirm) {
            if (CpfCnpj.isValidCpf(data.cpf) || true) {
                let {passwordConfirm, ...rest} = data;
                new HttpRequest().signUp(rest, (result => {
                    let id = JSON.parse(result).id;
                    if (id != null) {
                        FarmaStorage.user.set({id, ...rest});
                        alert("Cadastrado concluido");
                        props.history.push(FarmaRoutes.home);
                    } else {
                        alert("O cadastro não pode ser concluido");
                    }
                }));
            } else {
                alert("Cpf invalido "+data.cpf);
            }
        } else {
            alert("Senhas não batem "+data.password+" e "+data.passwordConfirm);
        }
    };

    const mapOnChange = (latLng) => {
        values.data.latLng = latLng;
        setValues(values);
    };

    const onChange = (event) => {
        let target = event.currentTarget;
        values.data[target.name] = target.value;
        setValues(values);
    };

    const buildInput = (type, name) =>{
        return <Form.Group>
            <Form.Label>{labels[name]}</Form.Label>
            <Form.Control
                required
                type={type}
                name={name}
                onChange={onChange}
                placeholder={infos[name]}
            />
        </Form.Group>
    };

    return <Dash {...props}>
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h2> Cadastro </h2> <hr/>
                    </Card.Title>
                    <Container>
                        <Form onSubmit={handleSubmit}>
                            {buildInput("text","name")}
                            {buildInput("password","password")}
                            {buildInput("password", "passwordConfirm")}
                            {buildInput("text", "cpf")}
                            <ListGroup>
                                <ListGroup.Item style={{height: "20rem"}}>
                                    <p>Insira sua localização</p>
                                    <GoogleMapsInput onChange={mapOnChange}/>
                                </ListGroup.Item>
                                <ListGroup.Item className="text-center">
                                    <Button className="buttonsClass" type="submit">
                                        Crie seu cadastro
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Form>
                    </Container>
                </Card.Body>
            </Card>
        </Container>
    </Dash>
};

export default SignUp;