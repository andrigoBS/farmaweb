class StorageWrapper {
    constructor(key){
        this.key = key;
        this.storage = window.sessionStorage;
    }
    setJson(json){
        this.storage.setItem(this.key, json);
    }
    set(value){
        let json = JSON.stringify(value);
        this.storage.setItem(this.key, json);
    }
    getJson(){
        return this.storage.getItem(this.key);
    }
    get(){
        let json = this.storage.getItem(this.key);
        return JSON.parse(json);
    }
    remove(){
        this.storage.removeItem(this.key);
    }
    isNull(){
        return this.get() === null;
    }
}

const FarmaStorage = {
    user: new StorageWrapper("farmaUser"),
    basket: new StorageWrapper("farmaBasket"),
    pharmacy: new StorageWrapper("farmaPharmacy"),
};

export default FarmaStorage;
