import React, {useState} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Image} from "react-bootstrap";
import Profile from "../../resource/profile.png";
import Basket from "../../resource/basket.png";
import FarmaStorage from "../../data/FarmaStorage";
import PharmacyHttpRequest from "../../data/PharmacyHttpRequest";
import {RoutePath} from "../../FarmaRoutes";
import CpfCnpj from "../../data/CpfCnpj";

const PharmacyLoginInput = (props) => {
    let [value, setState] = useState(true);
    const update = () => setState(!value);
    return FarmaStorage.pharmacy.isNull() ? <NoLoggedInput update={update} {...props}/> : <LoggedInput update={update} {...props}/>;
};

const NoLoggedInput = (props) => {
    let [values, setValues] = useState({cnpjL: "", passwordL: ""});

    const onChange = (event) => {
        event.preventDefault();
        let input = event.currentTarget;
        values[input.name] = input.value;
        setValues(values);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if(CpfCnpj.isValidCnpj(values.cnpjL)){
            new PharmacyHttpRequest().login(values.cnpjL, values.passwordL, result => {
                    FarmaStorage.pharmacy.setJson(result);
                    props.update();
                }
            );
        }else {
            alert("Cnpj invalido");
        }
    };

    return <Form onSubmit={onSubmit} className="m-0">
        <Form.Label className="m-0"> Ja possui cadastro ?</Form.Label>
        <InputGroup>
            <InputGroup.Prepend>
                <FormControl type="text" placeholder="Digite o CNPJ..." size="sm" onChange={onChange} name="cnpjL"/>
            </InputGroup.Prepend>
            <InputGroup.Append>
                <FormControl type="password" placeholder="Digite sua Senha..." size="sm" onChange={onChange} name="passwordL"/>
            </InputGroup.Append>
            <InputGroup.Append>
                <Button type="submit" size="sm" className="buttonsClass">Entrar</Button>
            </InputGroup.Append>
        </InputGroup>
        <Button className="m-0" variant="link" size="sm" href={RoutePath.pharmacy.signUp}>Não possui cadastro ? Click aqui...</Button>
    </Form>
};

const LoggedInput = (props) => {
    const onClick = (event) => {
        event.preventDefault();
        FarmaStorage.pharmacy.remove();
        props.update();
    };

    const toProducts = (event) => {
        event.preventDefault();
        new PharmacyHttpRequest().getProducts(FarmaStorage.pharmacy.get().id,(result) => {
            props.history.push(RoutePath.pharmacy.products, result);
        });
    };

    return <div>
        <Button variant="link" href={RoutePath.pharmacy.profile}>
            <Image src={Profile} style={{height: "3rem", width:"3rem"}}/>
            <br/>
            {FarmaStorage.pharmacy.get().name}
        </Button>
        <Button onClick={onClick} type="button" className="buttonsClass">Sair</Button>
        <Button variant="link" onClick={toProducts} type="button">
            <Image src={Basket} style={{height:'2rem',width:'2rem'}}/>
        </Button>
    </div>
};

export default PharmacyLoginInput;