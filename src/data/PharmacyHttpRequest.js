export default class PharmacyHttpRequest {
    constructor() {
        this.url = "http://localhost:8082/farmacompare/pharmacy";
        //this.url = "http://192.168.0.12:8081/farmacompare/pharmacy";
        //this.url = "http://192.168.137.207:8080/farmacompare/pharmacy";
    }

    login(cnpj, password, getJsonCallBack){
        const loginJson = JSON.stringify({cnpj: cnpj, password: password});
        this._fetch("Login", loginJson, getJsonCallBack);
    }

    signUp(user, getJsonCallBack){
        let {latLng, ...rest} = user;
        let json = JSON.stringify({...rest, ...latLng});
        this._fetch("SignUp", json, getJsonCallBack);
    }

    getProducts(pharmacyId, getJsonCallBack){
        let json = JSON.stringify({pharmacyId: pharmacyId});
        this._fetch("GetProducts", json, getJsonCallBack)
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