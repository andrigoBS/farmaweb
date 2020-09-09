import Basket from "./Basket";
import FarmaStorage from "./FarmaStorage";

export default class HttpRequest {
    constructor() {
        this.url = "http://localhost:8082/farmacompare/";
        //this.url = "http://192.168.0.12:8081/farmacompare/";
        //this.url = "http://192.168.137.207:8080/farmacompare/";
    }

    login(cpf, password, getJsonCallBack){
        const loginJson = JSON.stringify({cpf: cpf, password: password});
        this._fetch("login", loginJson, getJsonCallBack);
    }

    profile(user, getJsonCallBack){
        let {latLng, ...rest} = user;
        let json = JSON.stringify({...rest, ...latLng});
        this._fetch("userProfile", json, getJsonCallBack);
    }

    signUp(user, getJsonCallBack){
        let {latLng, ...rest} = user;
        let json = JSON.stringify({...rest, ...latLng});
        this._fetch("signUp", json, getJsonCallBack);
    }

    getProducts(name, latLng, getJsonCallBack){
        let requestJson = JSON.stringify({name: name, ...latLng});
        this._fetch("search", requestJson, getJsonCallBack);
    }

    buy(getJsonCallBack){
        let basket = new Basket().getFetchJson();
        this._fetch("buy", basket, getJsonCallBack);
    }

    delete(getJsonCallBack){
        let user = FarmaStorage.user.get();
        let json = JSON.stringify({id: user.id, password: user.password});
        this._fetch("deleteProfile", json, getJsonCallBack);
    }
    /**
     * Generic fetch
     * @private
     */
    _fetch(servletName, body, getJsonCallBack){
        fetch(this.url+servletName, {method: 'post', body: body})
            .then(response => {
                if(response.status === 200){
                    response.text().then(getJsonCallBack);
                }else {
                    alert("Bad Connection");
                }
            });
    }
}