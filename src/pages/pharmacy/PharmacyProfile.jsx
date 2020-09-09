import React, {useState} from "react";
import FarmaStorage from "../../data/FarmaStorage";
import PharmacyHttpRequest from "../../data/PharmacyHttpRequest";
import {ListGroup} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import GoogleMapsInput from "../../components/Inputs/GoogleMapsInput";
import PharmacyDash from "../../components/navegation/PharmacyDash";

const PharmacyProfile = (props) => {
    let pharmacy = FarmaStorage.pharmacy.get();
    let [values, setValues] = useState({
        id: pharmacy.id,
        name: pharmacy.name,
        password: pharmacy.password,
        passwordConfirm: pharmacy.passwordConfirm,
        cnpj: pharmacy.cnpj,
        email: pharmacy.email,
        site: pharmacy.site,
        facebook: pharmacy.facebook,
        phone: pharmacy.phone,
        smartphone: pharmacy.smartphone,
        haveWhatsApp: pharmacy.haveWhatsApp,
        latLng: {
            lat: pharmacy.lat,
            lng: pharmacy.lng,
        },
    });

    const submit = (event) => {
        if(values.password === values.passwordConfirm){
            let {passwordConfirm, ...rest} = values;
            new PharmacyHttpRequest().profile(rest, (result => {
                if(JSON.parse(result).success){
                    alert("Perfil editado com sucesso");
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

    const checkBoxOnChange = (event) => {
        let target = event.currentTarget;
        values.haveWhatsApp = target.checked;
        setValues(values);
    };

    return <PharmacyDash {...props}>
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                        <h2> Perfil </h2> <hr/>
                    </Card.Title>
                    <Container>
                        <ListGroup>
                            <ListGroup.Item>
                                Nome: <b> {pharmacy.name} </b>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Senha: <input type="password" name="password" className="form-control" onChange={onChange}/>
                                Confimar senha: <input type="password" name="passwordConfirm" className="form-control" onChange={onChange}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                CNPJ: <b> {pharmacy.cnpj} </b>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Email: <input type="text" name="email" className="form-control" onChange={onChange}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Site: <input type="text" name="site" className="form-control" onChange={onChange}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Facebook: <input type="text" name="facebook" className="form-control" onChange={onChange}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Fone: <input type="text" name="fone" className="form-control" onChange={onChange}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Celular: <input type="text" name="celular" className="form-control" onChange={onChange}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Esse numero possui WhatsApp?
                                <input name="haveWhatsApp" type="checkbox" className="form-check-input m-2" onChange={checkBoxOnChange}/>
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
                        </ListGroup>
                    </Container>
                </Card.Body>
            </Card>
        </Container>
    </PharmacyDash>
};

export default PharmacyProfile;