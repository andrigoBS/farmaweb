import FarmaStorage from "./FarmaStorage";

export default class Basket {
     constructor(){
         if(FarmaStorage.basket.isNull()){
             this.products = [];
             this.userId = FarmaStorage.user.get().id;
         }else {
             let values = FarmaStorage.basket.get();
             this.products = values.products;
             this.userId = values.userId;
         }
     }

    setHowManyById(productId, howManyUnits){
        this.products[this.indexOfById(productId)].howManyUnits = howManyUnits;
    }

     addProduct(product){
         let indexProduct = this.indexOfById(product.id);
         if(indexProduct >= 0){
             this.products[indexProduct].howManyUnits++;
         }else {
             this.products[this.products.length] = product;
         }
     }

     removeAllProduct() {
        FarmaStorage.basket.remove();
     }

     removeOneProduct(productId){
         if(this.products.length <= 1){
             this.products = [];
         }else {
             let index = this.indexOfById(productId);
             this.products.slice(index, 2);
         }
     }

    indexOfById(id){
        for (let i = 0; i < this.products.length; i++) {
            if(this.products[i].id === id) return i;
        }
        return -1;
    }

    getFetchJson(){
         let values = {
             userId: this.userId,
             products: [],
         };
         this.products.forEach((product, index) => {
             let {image, name, ...cleanProduct} = product;
             values.products[index] = cleanProduct;
         });
         return JSON.stringify(values);
    }
}
