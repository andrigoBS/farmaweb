import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home";
import Location from "./pages/Location";
import SignUp from "./pages/SignUp";
import Basket from "./pages/Basket";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import PharmacyHome from "./pages/pharmacy/PharmacyHome";
import PharmacySignUp from "./pages/pharmacy/PharmacySignUp";
import PharmacyProfile from "./pages/pharmacy/PharmacyProfile";
import PharmacyProducts from "./pages/pharmacy/PharmacyProducts";

export class RoutePath {
    static home = '/';
    static location = '/location';
    static signUp = '/signUp';
    static basket = '/basket';
    static products = '/products';
    static profile = '/profile';
    static pharmacy = {
        home: '/pharmacy',
        signUp: '/pharmacySignUp',
        products: '/pharmacyProducts',
        profile: '/pharmacyProfile',
        addProduct: '/pharmacyAddProduct',
    };
    // estudar sub rota pra substituir "/pharmacySignUp" por "/pharmacy/signup" por exemplo
}

const FarmaRoutes = (props) => {
    return <BrowserRouter>
        <Route exact path={RoutePath.home} component={Home}/>
        <Route path={RoutePath.location} component={Location}/>
        <Route path={RoutePath.signUp} component={SignUp}/>
        <Route path={RoutePath.basket} component={Basket}/>
        <Route path={RoutePath.products} component={Products}/>
        <Route path={RoutePath.profile} component={Profile}/>
        <Route path={RoutePath.pharmacy.home} component={PharmacyHome}/>
        <Route path={RoutePath.pharmacy.signUp} component={PharmacySignUp}/>
        <Route path={RoutePath.pharmacy.profile} component={PharmacyProfile}/>
        <Route path={RoutePath.pharmacy.products} component={PharmacyProducts}/>
    </BrowserRouter>
};

export default FarmaRoutes;