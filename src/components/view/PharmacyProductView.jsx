import React, {useState} from "react";
import {Card, Col, Image} from "react-bootstrap";
import Row from "react-bootstrap/Row";

const PharmacyProductView = (props) => {
    const product = props.product;
    const info = product.info;

    let [values, setValues] = useState({
        medicineInStock: product.medicineInStock,
        prescription: info.prescription,
        value: product.value,
    });

    const onChange = (event) => {
        event.preventDefault();
        let target = event.currentTarget;
        values[target.id] = target.value;
        setValues(values);
    };

    const checkBoxOnChange = (event) => {
        event.preventDefault();
        values.prescription = event.currentTarget.checked;
        setValues(values);
    };

    return <Card style={{width: "22rem", height: "16rem"}}>
        <Card.Body>
            <Row>
                <Col style={{width: "8rem", height: "8rem"}}>
                    <Image style={{height:'7rem',width:'7rem'}} src={product.image}/>
                    <p>Quantidade em estoque</p>
                    <input style={{width:'7rem'}} type="number"
                           className="form-control" defaultValue={values.medicineInStock}
                           onChange={onChange} id="medicineInStock"/>
                </Col>
                <Col>
                    <h3>{product.name}</h3>
                    Tipo: <b>{info.type}</b> <br/>
                    Laboratório: <b>{info.laboratory}</b>  <br/>
                    Prescrição: <input type="checkbox" className="form-check-input m-2"
                                       onChange={checkBoxOnChange} defaultChecked={values.prescription}/> <br/>
                    Descrição: <b>{info.description}</b>  <br/>
                    <Row>
                        <Col md={{ span: 0, offset: 1 }}>
                            <h4>R$:</h4>
                        </Col>
                        <Col md={{ span: 0, offset: 0 }}>
                            <input style={{width:'5rem', height: '2rem'}} type="number"
                                   className="form-control" defaultValue={values.value}
                                   onChange={onChange} id="value"/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card.Body>
    </Card>
};

export default PharmacyProductView;