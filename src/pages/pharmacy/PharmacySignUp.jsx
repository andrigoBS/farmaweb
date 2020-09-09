import React, {useState} from "react";
import CpfCnpj from "../../data/CpfCnpj";
import FarmaRoutes from "../../FarmaRoutes";
import Form from "react-bootstrap/Form";
import {Button, Card, Container, ListGroup} from "react-bootstrap";
import GoogleMapsInput from "../../components/Inputs/GoogleMapsInput";
import PharmacyDash from "../../components/navegation/PharmacyDash";
import PharmacyHttpRequest from "../../data/PharmacyHttpRequest";

const infos = {
    name: "Digite o nome fantasia...",
    password: "Escolha uma senha...",
    passwordConfirm: "Digite novamente sua senha...",
    cnpj: "Exemplo: 12345678901234",
    email: "Se possuir informe o Email",
    site: "Se possuir informe o site",
    facebook: "Se possuir informe o facebook",
    phone: "Infome o telefone comercial se possuir",
    smartphone: "Infome o celular da farmacia se possuir",
};

const labels = {
    name: "Nome*",
    password: "Senha*",
    passwordConfirm: "Confirmar senha*",
    cnpj: "CNPJ*",
    email: "Email",
    site: "Site",
    facebook: "Facebook",
    phone: "Telefone comercial",
    smartphone: "Celular da farmacia",
};

const PharmacySignUp = (props) => {
    let [values, setValues] = useState({
        data: {
            name: "",
            password: "",
            passwordConfirm: "",
            cnpj: "",
            email: "",
            site: "",
            facebook: "",
            phone: "",
            smartphone: "",
            haveWhatsApp: false,
            latLng: {
                lat: 0,
                lng: 0,
            },
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = values.data;
        if(data.password === data.passwordConfirm && CpfCnpj.isValidCnpj(data.cnpj)){
            let {passwordConfirm, ...rest} = data;
            new PharmacyHttpRequest().signUp(rest, (result => {
                if(JSON.parse(result).success){
                    props.history.push(FarmaRoutes.pharmacy.home);
                }else {
                    alert("O cadastro não pode ser concluido");
                }
            }));
        }
    };

    const mapOnChange = (latLng) => {
        values.data.latLng = latLng;
        setValues(values);
    };

    const checkBoxOnChange = (event) => {
        let target = event.currentTarget;
        values.data.haveWhatsApp = target.checked;
        setValues(values);
    };

    const onChange = (event) => {
        let target = event.currentTarget;
        values.data[target.name] = target.value;
        setValues(values);
    };

    const buildInput = (type, name) =>{
        let required = labels[name].includes("*");
        return <Form.Group>
            <Form.Label>{labels[name]}</Form.Label>
            <Form.Control
                required={required}
                type={type}
                name={name}
                onChange={onChange}
                placeholder={infos[name]}
            />
        </Form.Group>
    };

    return <PharmacyDash {...props}>
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
                            {buildInput("text", "cnpj")}
                            {buildInput("text", "email")}
                            {buildInput("text","site")}
                            {buildInput("text", "facebook")}
                            {buildInput("text","phone")}
                            {buildInput("text", "smartphone")}
                            <Form.Check type="checkbox" label="Esse numero possui WhatsApp?" onChange={checkBoxOnChange}/>
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
    </PharmacyDash>
};

export default PharmacySignUp;