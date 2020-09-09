import React, {useState} from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Image} from "react-bootstrap";
import Profile from "../../resource/profile.png";
import Basket from "../../resource/basket.png";
import HttpRequest from "../../data/HttpRequest";
import FarmaStorage from "../../data/FarmaStorage";
import CpfCnpj from "../../data/CpfCnpj";
import {RoutePath} from "../../FarmaRoutes";

const LoginInput = (props) => {
    let [value, setState] = useState(true);
    const update = () => setState(!value);
    return FarmaStorage.user.isNull() ? <NoLoggedInput update={update}/> : <LoggedInput update={update}/>;
};

const NoLoggedInput = (props) => {
    let [values, setValues] = useState({cpfL: "", passwordL: ""});

    const onChange = (event) => {
        event.preventDefault();
        let input = event.currentTarget;
        values[input.name] = input.value;
        setValues(values);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if(CpfCnpj.isValidCpf(values.cpfL) || true){
            new HttpRequest().login(values.cpfL, values.passwordL, result => {
                    FarmaStorage.user.setJson(result);
                    props.update();
                }
            );
        }else {
            alert("cpf invalido "+values.cpfL);
        }
    };

    return <Form onSubmit={onSubmit} className="m-0">
        <Form.Label className="m-0"> Ja possui cadastro ?</Form.Label>
        <InputGroup>
            <InputGroup.Prepend>
                <FormControl type="text" placeholder="Digite seu CPF..." size="sm" onChange={onChange} name="cpfL"/>
            </InputGroup.Prepend>
            <InputGroup.Append>
                <FormControl type="password" placeholder="Digite sua Senha..." size="sm" onChange={onChange} name="passwordL"/>
            </InputGroup.Append>
            <InputGroup.Append>
                <Button type="submit" size="sm" className="buttonsClass">Entrar</Button>
            </InputGroup.Append>
        </InputGroup>
        <Button className="m-0" variant="link" size="sm" href={RoutePath.signUp}>Não possui cadastro ? Click aqui...</Button>
    </Form>
};

const LoggedInput = (props) => {
    const onClick = (event) => {
        event.preventDefault();
        FarmaStorage.user.remove();
        props.update();
    };
    return <div>
        <Button variant="link" href={RoutePath.profile}>
            <Image src={Profile} style={{height: "3rem", width:"3rem"}}/>
            <br/>
            {FarmaStorage.user.get().name}
        </Button>
        <Button onClick={onClick} type="button" className="buttonsClass">Sair</Button>
        <Button variant="link" href={RoutePath.basket}>
            <Image src={Basket} style={{height:'2rem',width:'2rem'}}/>
        </Button>
    </div>
};

export default LoginInput;