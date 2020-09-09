import React, {useState} from "react";
import Dash from "../components/navegation/Dash";
import {Button, Card, Container, ListGroup} from "react-bootstrap";
import GoogleMapsInput from "../components/Inputs/GoogleMapsInput";
import FarmaStorage from "../data/FarmaStorage";
import HttpRequest from "../data/HttpRequest";
import {RoutePath} from "../FarmaRoutes";

const Profile = (props) => {
    let user = FarmaStorage.user.get();
    let [values, setValues] = useState({
        id: user.id,
        password: user.password,
        passwordConfirm: user.password,
        latLng: user.latLng,
    });

    const deleteProfile = (event) => {
        new HttpRequest().delete((result => {
            if(JSON.parse(result).success){
                FarmaStorage.user.remove();
                alert("Conta apagada com sucesso");
                props.history.push(RoutePath.home);
            }else {
                alert("O perfil não pode ser editado");
            }
        }));
    };

    const submit = (event) => {
        if(values.password === values.passwordConfirm){
            let {passwordConfirm, ...rest} = values;
            new HttpRequest().profile(rest, (result => {
                if(JSON.parse(result).success){
                    let userEdited = FarmaStorage.user.get();
                    userEdited.password = values.password;
                    userEdited.latLng = values.latLng;
                    FarmaStorage.user.set(userEdited);
                    alert("Perfil editado com sucesso");
                    props.history.push(RoutePath.home);
                }else {
                    alert("O perfil não pode ser editado");
                }
            }));
        }
    };

    const onChange = (event) => {
        let target = event.currentTarget;
        values[target.name] = target.value;
        setValues(values);
    };

    const mapOnChange = (latLng) => {
        values.latLng = latLng;
        setValues(values);
    };
    return <Dash>
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h2> Perfil </h2> <hr/>
                    </Card.Title>
                    <Container>
                        <ListGroup>
                            <ListGroup.Item>
                                Nome: <b> {user.name} </b>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                CPF: <b> {user.cpf} </b>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Senha: <input type="password" name="password"
                                              className="form-control" onChange={onChange}
                                              defaultValue={values.password}/>
                                Confirmar senha: <input type="password" name="passwordConfirm"
                                                        className="form-control" onChange={onChange}
                                                defaultValue={values.password}/>
                            </ListGroup.Item>
                            <ListGroup.Item style={{height: "20rem"}}>
                                <h4>Editar sua localização</h4>
                                <GoogleMapsInput onChange={mapOnChange} initCenter={values.latLng}/>
                            </ListGroup.Item>
                            <ListGroup.Item className="text-center">
                                <Button className="buttonsClass" type="button" onClick={submit}>
                                    Editar perfil
                                </Button>
                            </ListGroup.Item>
                            <ListGroup.Item className="text-center">
                                <Button className="buttonsClass" type="button" onClick={deleteProfile}>
                                    Apagar conta
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Container>
                </Card.Body>
            </Card>
        </Container>
    </Dash>
};

export default Profile;