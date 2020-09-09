import React from "react";

const PharmacyInfo = (props) => {
    let haveEmail = props.pharmacy.email === null;
    let haveSite = props.pharmacy.site === null;
    let haveFacebook = props.pharmacy.facebook === null;
    let havePhone = props.pharmacy.phone === null;
    let haveSmartPhone = props.pharmacy.smartPhone === null;
    let whatsApp = props.pharmacy.haveWhatsapp? "(WhatsApp)": "";

    return <div>
        <h5>Dados da Farmácia</h5>
        Nome: <b>{props.pharmacy.name}</b>  <br/>
        {haveEmail? "" : <div>Email: <b>{props.pharmacy.email}</b></div>}
        {haveSite? "" : <div>Site: <b>{props.pharmacy.site}</b></div>}
        {haveFacebook? "" : <div>Facebook: <b>{props.pharmacy.facebook}</b></div>}
        {havePhone? "" : <div>Telefone: <b>{props.pharmacy.phone}</b></div>}
        {haveSmartPhone? "" : <div>Celular: <b>{props.pharmacy.phone} {whatsApp}</b></div>}
    </div>
};

export default PharmacyInfo;