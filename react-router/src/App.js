import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Product from "./components/Product";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
// import Navbar from "./components/Navbar";
import DetailProduct from "./components/DetailProduct";
import MyChart from "./components/MyChart";
import UpdateQuantity from "./components/UpdateQuantity";
import Checkout from './components/Checkout'

const App = () => {
  
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar show={show}/> */}
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/product" component={Product} />
          <Route exact path="/product/add" component={AddProduct} />
          <Route exact path="/product/update/:id" component={UpdateProduct} />
          <Route exact path="/detailProduct" component={DetailProduct} />
          <Route exact path="/myChart" component={MyChart} />
          <Route exact path="/chart/:id/update/:productId" component={UpdateQuantity} />
          <Route exact path="/chart/checkout/:id" component={Checkout} />
      </BrowserRouter>
    </div>
  );
}

export default App;
